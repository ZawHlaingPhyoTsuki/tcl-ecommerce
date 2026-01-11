import type { NextFunction, Request, Response } from "express";
import { ProductIdSchema, ProductSlugSchema } from "@/common/dto";
import { formatZodError } from "@/common/utils/zod-error";
import { GetAllProductsQuerySchema } from "./dto";
import {
	favoriteProductService,
	getAllProductsService,
	getProductBySlugService,
} from "./service";

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
				errors: formatZodError(parsedQuery.error),
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
				errors: formatZodError(parsed.error),
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

export const getProductBySlugController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const parsed = ProductSlugSchema.safeParse(req.params);

		if (!parsed.success) {
			return res.status(400).json({
				success: false,
				message: "Validation failed",
				errors: formatZodError(parsed.error),
			});
		}

		const result = await getProductBySlugService(parsed.data.slug);

		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
