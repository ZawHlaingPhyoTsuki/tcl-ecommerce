import prisma, {
	type Image,
	type Prisma,
	type Product,
	Role,
	SellerStatus,
} from "@tcl-ecommerce/db";
import { ApiError } from "@/utils/api-error";
import { deleteFromCloudinary, uploadToCloudinary } from "@/utils/cloudinary";
import {
	generateProductUniqueSlug,
	generateSellerUniqueSlug,
} from "@/utils/generate-unique-slug";
import { paginationMetadata } from "@/utils/pagination-metadata";
import type {
	CreateSellerProductType,
	GetAllSellersQueryType,
	RegisterSellerType,
} from "./dto";

// Admin
export const getAllSellerService = async (query: GetAllSellersQueryType) => {
	const { page, limit, search, status, sortBy, sortOrder } = query;

	const where: Prisma.SellerWhereInput = {
		...(search && {
			OR: [
				{ shopName: { contains: search, mode: "insensitive" } },
				{ slug: { contains: search, mode: "insensitive" } },
			],
		}),
		...(status && { status: status as SellerStatus }),
	};

	const [sellers, total] = await Promise.all([
		prisma.seller.findMany({
			where,
			skip: (page - 1) * limit,
			take: limit,
			orderBy: {
				[sortBy]: sortOrder,
			},
			select: {
				id: true,
				shopName: true,
				slug: true,
				bio: true,
				phone: true,
				address: true,
				status: true,
				createdAt: true,
				updatedAt: true,
				user: {
					select: {
						name: true,
						email: true,
						image: true,
					},
				},
			},
		}),
		prisma.seller.count({ where }),
	]);

	// Calculate pagination metadata
	const pagination = paginationMetadata(page, limit, total);

	return {
		success: true,
		message: "Sellers retrieved successfully",
		data: {
			sellers,
			pagination,
		},
	};
};

export const approveSellerRegisterService = async (sellerId: string) => {
	const seller = await prisma.seller.findUnique({
		where: { id: sellerId },
	});

	if (!seller) {
		throw ApiError.notFound("Seller not found");
	}

	if (seller.status === SellerStatus.APPROVED) {
		throw ApiError.badRequest("Seller is already approved");
	}

	await prisma.$transaction(async (tx) => {
		await tx.seller.update({
			where: { id: sellerId },
			data: { status: SellerStatus.APPROVED },
		});

		await tx.user.update({
			where: { id: seller.userId },
			data: { role: Role.SELLER },
		});
	});

	return {
		success: true,
		message: "Seller approved successfully",
	};
};

// Seller
export const listSellerProductsService = async (userId: string) => {
	const seller = await prisma.seller.findUnique({
		where: { userId },
	});

	if (!seller) {
		throw ApiError.notFound("Seller not found");
	}

	const products = await prisma.product.findMany({
		where: { sellerId: seller.id },
	});

	return {
		success: true,
		message: "Seller products retrieved successfully",
		data: products,
	};
};

export const createSellerProductsService = async (
	data: CreateSellerProductType,
	userId: string,
	files?: Express.Multer.File[],
) => {
	const seller = await prisma.seller.findUnique({
		where: { userId },
		select: { id: true, status: true },
	});

	if (!seller) {
		throw ApiError.notFound("Seller profile not found");
	}

	if (seller.status !== SellerStatus.APPROVED) {
		throw ApiError.forbidden("Your seller account is not approved yet");
	}

	const baseSlug = data.slug || data.name;
	const uniqueSlug = await generateProductUniqueSlug(baseSlug, prisma.product);

	// Upload images before transaction
	let uploadResults: { url: string; publicId: string }[] = [];
	if (files && files.length > 0) {
		const folder = `tachileik-shop/products/${seller.id}`;
		const uploadPromises = files.map((file) =>
			uploadToCloudinary(file.buffer, { folder }),
		);
		uploadResults = await Promise.all(uploadPromises);
	}

	let product: (Product & { images: Image[] }) | null;

	try {
		product = await prisma.$transaction(async (tx) => {
			const newProduct = await tx.product.create({
				data: {
					name: data.name,
					slug: uniqueSlug,
					description: data.description,
					price: data.price,
					stock: data.stock,
					currency: data.currency,
					categoryId: data.categoryId,
					sellerId: seller.id,
				},
			});

			if (uploadResults.length > 0) {
				await tx.image.createMany({
					data: uploadResults.map((result) => ({
						url: result.url,
						publicId: result.publicId,
						productId: newProduct.id,
					})),
				});
			}

			return tx.product.findUnique({
				where: { id: newProduct.id },
				include: { images: true },
			});
		});
	} catch (error) {
		// Cleanup uploaded images on transaction failure
		if (uploadResults.length > 0) {
			await Promise.allSettled(
				uploadResults.map((result) => deleteFromCloudinary(result.publicId)),
			);
		}
		throw error;
	}

	return {
		success: true,
		message: "Product created successfully",
		data: product,
	};
};

export const registerSellerService = async (
	data: RegisterSellerType,
	userId: string,
) => {
	const { shopName, slug, bio, phone, address } = data;

	// Check if user already has a seller profile
	const existingSeller = await prisma.seller.findUnique({
		where: { userId },
	});

	if (existingSeller) {
		throw ApiError.conflict("You are already registered as a seller");
	}

	// Check if shop name is already taken
	const existingShopName = await prisma.seller.findUnique({
		where: { shopName },
	});

	if (existingShopName) {
		throw ApiError.conflict("Shop name is already taken");
	}

	// Check if slug is already taken (only if provided)
	if (slug) {
		const existingSlug = await prisma.seller.findUnique({
			where: { slug },
		});
		if (existingSlug) {
			throw ApiError.conflict("Slug is already taken");
		}
	}

	// Create seller in a transaction
	const seller = await prisma.seller.create({
		data: {
			shopName,
			slug: slug
				? slug
				: await generateSellerUniqueSlug(shopName, prisma.seller),
			bio: bio || null,
			phone: phone || null,
			address: address || null,
			status: SellerStatus.PENDING,
			user: {
				connect: { id: userId },
			},
		},
	});

	return {
		success: true,
		message: "Seller registration successful. Awaiting approval.",
		data: seller,
	};
};

export const sellerProfileService = async (userId: string) => {
	const seller = await prisma.seller.findUnique({
		where: { userId },
		select: {
			id: true,
			shopName: true,
			slug: true,
			bio: true,
			phone: true,
			address: true,
			status: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	if (!seller) {
		throw ApiError.notFound("Seller profile not found");
	}

	if (seller.status !== SellerStatus.APPROVED) {
		throw ApiError.forbidden("Your seller account is not approved yet");
	}

	return {
		success: true,
		message: "Seller profile retrieved successfully",
		data: seller,
	};
};

export const deleteSellerService = async (userId: string) => {
	const seller = await prisma.seller.findUnique({
		where: { userId },
		include: {
			products: true,
		},
	});

	if (!seller) {
		throw ApiError.notFound("Seller not found");
	}

	if (seller.products.length > 0) {
		throw ApiError.conflict(
			"Cannot delete seller with existing products. Please remove all products first.",
		);
	}

	await prisma.$transaction(async (tx) => {
		await tx.seller.delete({
			where: { id: seller.id },
		});

		await tx.user.update({
			where: { id: userId },
			data: { role: Role.CUSTOMER },
		});
	});

	return {
		success: true,
		message: "Seller deleted successfully",
	};
};
