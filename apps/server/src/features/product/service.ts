import prisma, { type Prisma } from "@tcl-ecommerce/db";
import { ApiError } from "@/common/utils/api-error";
import { paginationMetadata } from "@/common/utils/pagination-metadata";
import type {
	CreateReviewType,
	GetAllProductsQueryType,
	GetAllReviewsQueryType,
} from "./dto";

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

			// Get updated counts
			const updatedCounts = await tx.favorite.count({
				where: { productId },
			});

			return {
				success: true,
				message: "Product unfavorited successfully",
				data: {
					favorited: false,
					count: updatedCounts,
				},
			};
		}

		// Favorite
		await tx.favorite.create({
			data: { userId, productId },
		});

		// Get updated counts
		const updatedCounts = await tx.favorite.count({
			where: { productId },
		});

		return {
			success: true,
			message: "Product favorited successfully",
			data: {
				favorited: true,
				count: updatedCounts,
			},
		};
	});
};

export const likeProductService = async (productId: string, userId: string) => {
	return await prisma.$transaction(async (tx) => {
		// Verify product exists
		const product = await tx.product.findUnique({
			where: { id: productId },
			select: { id: true },
		});

		if (!product) {
			throw ApiError.notFound("Product not found");
		}

		// Check if already liked
		const existing = await tx.like.findUnique({
			where: { userId_productId: { userId, productId } },
		});

		if (existing) {
			// Unlike
			await tx.like.delete({
				where: { id: existing.id },
			});

			// Get updated counts
			const updatedCounts = await tx.like.count({
				where: { productId },
			});

			return {
				success: true,
				message: "Product unliked successfully",
				data: {
					liked: false,
					count: updatedCounts,
				},
			};
		}

		// Like
		await tx.like.create({
			data: { userId, productId },
		});

		// Get updated counts
		const updatedCounts = await tx.like.count({
			where: { productId },
		});

		return {
			success: true,
			message: "Product liked successfully",
			data: {
				liked: true,
				count: updatedCounts,
			},
		};
	});
};

export const getProductBySlugService = async (
	slug: string,
	userId?: string,
) => {
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
					city: true,
					createdAt: true,
					user: {
						select: {
							image: true,
						},
					},
				},
			},
			reviews: {
				select: {
					rating: true,
				},
			},
			likes: {
				// select: {
				// 	userId: true,
				// },
				where: userId ? { userId } : { userId: "impossible-id" },
				select: { userId: true },
				take: 1,
			},
			favorites: {
				where: userId ? { userId } : { userId: "impossible-id" },
				select: { userId: true },
				take: 1,
			},
			_count: {
				select: {
					likes: true,
					favorites: true,
				},
			},
		},
	});

	if (!product) {
		throw ApiError.notFound("Product not found");
	}

	const productWithStats = {
		...product,
		likes: {
			count: product._count.likes,
			userLiked: product.likes.length > 0,
		},
		favorites: {
			count: product._count.favorites,
			userFavorited: product.favorites.length > 0,
		},
	};

	return {
		success: true,
		message: "Product retrieved successfully",
		data: {
			product: productWithStats,
		},
	};
};

export const getReviewsService = async (query: GetAllReviewsQueryType) => {
	const { page, limit, productId } = query;

	// Calculate pagination
	const skip = (page - 1) * limit;

	const [reviews, total] = await Promise.all([
		prisma.review.findMany({
			where: {
				productId,
			},
			orderBy: { createdAt: "desc" },
			skip,
			take: limit,
			include: {
				user: {
					select: {
						name: true,
						image: true,
					},
				},
			},
		}),
		prisma.review.count({
			where: {
				productId,
			},
		}),
	]);

	// Calculate pagination metadata
	const pagination = paginationMetadata(page, limit, total);

	return {
		success: true,
		message: "Reviews retrieved successfully",
		data: {
			reviews,
			pagination,
		},
	};
};

export const postReviewService = async (
	data: CreateReviewType,
	userId: string,
) => {
	// Verify product exists
	const product = await prisma.product.findUnique({
		where: { id: data.productId },
		select: { id: true },
	});

	if (!product) {
		throw ApiError.notFound("Product not found");
	}

	const exists = await prisma.review.findUnique({
		where: {
			userId_productId: {
				userId,
				productId: data.productId,
			},
		},
		select: {
			id: true,
		},
	});

	if (exists) {
		throw ApiError.conflict("You have already reviewed this product");
	}

	const review = await prisma.review.create({
		data: {
			userId,
			productId: data.productId,
			rating: data.rating,
			comment: data.comment,
		},
	});

	return {
		success: true,
		message: "Review created successfully",
		data: {
			review,
		},
	};
};

export const getReviewsStatsService = async (productId: string) => {
	const [aggregates, starCounts] = await Promise.all([
		prisma.review.aggregate({
			where: { productId },
			_count: { rating: true },
			_avg: { rating: true },
		}),
		prisma.review.groupBy({
			by: ["rating"],
			where: { productId },
			_count: { rating: true },
		}),
	]);
	const total = aggregates._count.rating;
	const average = Number((aggregates._avg.rating ?? 0).toFixed(1));
	const starMap = new Map(starCounts.map((s) => [s.rating, s._count.rating]));
	const breakdown = [5, 4, 3, 2, 1].map((star) => ({
		star,
		count: starMap.get(star) ?? 0,
		percentage:
			total === 0 ? 0 : Math.round(((starMap.get(star) ?? 0) / total) * 100),
	}));
	return {
		success: true,
		message: "Reviews retrieved successfully",
		data: {
			total,
			average,
			breakdown,
		},
	};
};
