import type { NextFunction, Request, Response } from "express";
import { PaginationSchema } from "@/common/dto";
import { formatZodError } from "@/common/utils/zod-error";
import { getUserFavouriteProductsService } from "./service";

export const getUserFavouriteProductsController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const parsedQuery = PaginationSchema.safeParse(req.query);

		if (!parsedQuery.success) {
			return res.status(400).json({
				success: false,
				message: "Validation failed",
				errors: formatZodError(parsedQuery.error),
			});
		}

		const result = await getUserFavouriteProductsService(
			req.user.id,
			parsedQuery.data,
		);
		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
