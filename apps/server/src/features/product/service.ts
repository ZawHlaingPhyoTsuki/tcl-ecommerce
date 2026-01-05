import prisma, { type Prisma } from "@tcl-ecommerce/db";
import { ApiError } from "@/common/utils/api-error";
import { paginationMetadata } from "@/common/utils/pagination-metadata";
import type { GetAllProductsQueryType } from "./dto";

export const getAllProductsService = async (query: GetAllProductsQueryType) => {
	const {
		page,
		limit,
		search,
		minPrice,
		maxPrice,
		categoryId,
		sellerId,
		inStock,
		currency,
		sortField,
		sortOrder,
	} = query;

	// Build WHERE clause
	const where: Prisma.ProductWhereInput = {
		archivedAt: null, // Only active products

		// Stock filter
		...(inStock !== undefined && {
			stock: inStock ? { gt: 0 } : { equals: 0 },
		}),

		// Price range filter
		...((minPrice !== undefined || maxPrice !== undefined) && {
			price: {
				...(minPrice !== undefined && { gte: minPrice }),
				...(maxPrice !== undefined && { lte: maxPrice }),
			},
		}),

		// Category filter
		...(categoryId && { categoryId }),

		// Seller filter
		...(sellerId && { sellerId }),

		// Currency filter
		...(currency && { currency }),

		// Search in name or description
		...(search && {
			OR: [
				{ name: { contains: search, mode: "insensitive" } },
				{ description: { contains: search, mode: "insensitive" } },
			],
		}),
	};

	// Build ORDER BY clause
	const orderBy: Prisma.ProductOrderByWithRelationInput = {
		[sortField]: sortOrder,
	};

	// Calculate pagination
	const skip = (page - 1) * limit;

	// Execute queries in parallel
	const [products, total] = await Promise.all([
		prisma.product.findMany({
			where,
			orderBy,
			skip,
			take: limit,
			include: {
				images: {
					take: 1,
					select: { url: true, publicId: true },
				},
				category: {
					select: {
						id: true,
						name: true,
						slug: true,
					},
				},
				seller: {
					select: {
						id: true,
						shopName: true,
						slug: true,
					},
				},
			},
		}),
		prisma.product.count({ where }),
	]);

	// Calculate pagination metadata
	const pagination = paginationMetadata(page, limit, total);

	return {
		success: true,
		message: "Products retrieved successfully",
		data: {
			products,
			pagination,
		},
	};
};

export const favoriteProductService = async (
	productId: string,
	userId: string,
) => {
	return await prisma.$transaction(async (tx) => {
		// Verify product exists
		const product = await tx.product.findUnique({
			where: { id: productId },
			select: { id: true },
		});

		if (!product) {
			throw ApiError.notFound("Product not found");
		}

		// Check if already favorited
		const existing = await tx.favorite.findUnique({
			where: { userId_productId: { userId, productId } },
		});

		if (existing) {
			// Unfavorite
			await tx.favorite.delete({
				where: { id: existing.id },
			});

			return {
				success: true,
				message: "Product unfavorited successfully",
				data: {
					favorited: false,
				},
			};
		}

		// Favorite
		await tx.favorite.create({
			data: { userId, productId },
		});

		return {
			success: true,
			message: "Product favorited successfully",
			data: {
				favorited: true,
			},
		};
	});
};
