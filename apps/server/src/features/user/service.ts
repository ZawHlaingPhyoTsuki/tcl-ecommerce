import prisma from "@tcl-ecommerce/db";
import type { PaginationType } from "@/common/dto";
import { paginationMetadata } from "@/common/utils/pagination-metadata";

export const getUserFavouriteProductsService = async (
	userId: string,
	paginationQuery: PaginationType,
) => {
	const { page, limit } = paginationQuery;
	const skip = (page - 1) * limit;

	const [favorites, total] = await Promise.all([
		prisma.favorite.findMany({
			where: { userId },
			include: {
				product: {
					include: {
						images: true,
						seller: true,
					},
				},
			},
			skip,
			take: limit,
		}),
		prisma.favorite.count({ where: { userId } }),
	]);

	const pagination = paginationMetadata(page, limit, total);

	return {
		success: true,
		message: "Favourites retrieved successfully",
		data: {
			favorites,
			pagination,
		},
	};
};
