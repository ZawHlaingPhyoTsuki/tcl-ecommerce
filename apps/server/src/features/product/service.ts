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
		categorySlug,
		sellerSlug,
		inStock,
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
		...(categorySlug && { category: { slug: categorySlug } }),

		// Seller filter
		...(sellerSlug && { seller: { slug: sellerSlug } }),

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
					select: { url: true, publicId: true, width: true, height: true },
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

	// Fetch aggregated ratings for all products in parallel
	const productIds = products.map((product) => product.id);
	const ratingsData = await prisma.review.groupBy({
		by: ["productId"],
		where: {
			productId: {
				in: productIds,
			},
		},
		_avg: {
			rating: true,
		},
		_count: {
			rating: true,
		},
	});

	// Create a ratings lookup map
	const ratingsMap = new Map(
		ratingsData.map((rating) => [
			rating.productId,
			{
				average: Number((rating._avg.rating ?? 0).toFixed(1)),
				count: rating._count.rating,
			},
		]),
	);

	const productsWithRating = products.map((product) => {
		return {
			...product,
			rating: ratingsMap.get(product.id) ?? { average: 0, count: 0 },
		};
	});

	// Calculate pagination metadata
	const pagination = paginationMetadata(page, limit, total);

	return {
		success: true,
		message: "Products retrieved successfully",
		data: {
			products: productsWithRating,
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

export const getProductBySlugService = async (slug: string) => {
	const product = await prisma.product.findUnique({
		where: { slug },
		include: {
			images: {
				select: {
					url: true,
					width: true,
					height: true,
				},
			},
			category: {
				select: {
					id: true,
					slug: true,
					name: true,
				},
			},
			seller: {
				select: {
					id: true,
					shopName: true,
					slug: true,
					createdAt: true,
				},
			},
		},
	});

	if (!product) {
		throw ApiError.notFound("Product not found");
	}

	const rating = await prisma.review.groupBy({
		by: ["productId"],
		where: {
			productId: product.id,
		},
		_avg: {
			rating: true,
		},
		_count: {
			rating: true,
		},
	});

	const ratingData = rating[0];

	return {
		success: true,
		message: "Product retrieved successfully",
		data: {
			product: {
				...product,
				rating: {
					average: Number((ratingData?._avg.rating ?? 0).toFixed(1)),
					count: ratingData?._count.rating ?? 0,
				},
			},
		},
	};
};
