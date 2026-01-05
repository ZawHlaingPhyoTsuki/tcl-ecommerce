import prisma from "@tcl-ecommerce/db";

export const getUserFavouritesService = async (userId: string) => {
	const result = await prisma.favorite.findMany({
		where: { userId },
		include: {
			product: {
				include: {
					images: true,
					seller: true,
				},
			},
		},
	});

	return {
		success: true,
		message: "Favourites retrieved successfully",
		data: result.map((favorite) => favorite.product),
	};
};
