import type { NextFunction, Request, Response } from "express";
import { ProductIdSchema, ProductSlugSchema } from "@/common/dto";
import { formatZodError } from "@/common/utils/zod-error";
import {
	GetAllProductsQuerySchema,
	GetAllReviewsQuerySchema,
	PostReviewSchema,
} from "./dto";
import {
	favoriteProductService,
	getAllProductsService,
	getProductBySlugService,
	getReviewsService,
	getReviewsStatsService,
	likeProductService,
	postReviewService,
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

export const likeProductController = async (
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

		const result = await likeProductService(parsed.data.productId, req.user.id);

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

		const result = await getProductBySlugService(
			parsed.data.slug,
			req.user?.id,
		);

		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export const getReviewsController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const parsed = GetAllReviewsQuerySchema.safeParse({
			productId: req.params.productId,
			...req.query,
		});

		if (!parsed.success) {
			return res.status(400).json({
				success: false,
				message: "Validation failed",
				errors: formatZodError(parsed.error),
			});
		}

		const result = await getReviewsService(parsed.data);

		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export const postReviewController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const parsed = PostReviewSchema.safeParse({
			productId: req.params.productId,
			...req.body,
		});

		if (!parsed.success) {
			return res.status(400).json({
				success: false,
				message: "Validation failed",
				errors: formatZodError(parsed.error),
			});
		}

		const result = await postReviewService(parsed.data, req.user.id);

		return res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

export const getReviewsStatsController = async (
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

		const result = await getReviewsStatsService(parsed.data.productId);

		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
