import type { NextFunction, Request, Response } from "express";
import { ProductIdSchema } from "@/common/dto";
import { GetAllProductsQuerySchema } from "./dto";
import { favoriteProductService, getAllProductsService } from "./service";

export const getAllProductsController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const parsedQuery = GetAllProductsQuerySchema.safeParse(req.query);

		if (!parsedQuery.success) {
			return res.status(400).json({
				success: false,
				message: "Validation failed",
				errors: parsedQuery.error.issues.map((err) => ({
					path: err.path.join("."),
					message: err.message,
				})),
			});
		}

		const result = await getAllProductsService(parsedQuery.data);

		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export const favoriteProductController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const parsed = ProductIdSchema.safeParse(req.params);

		if (!parsed.success) {
			return res.status(400).json({
				success: false,
				message: "Validation failed",
				errors: parsed.error.issues.map((err) => ({
					path: err.path.join("."),
					message: err.message,
				})),
			});
		}

		const result = await favoriteProductService(
			parsed.data.productId,
			req.user.id,
		);

		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
