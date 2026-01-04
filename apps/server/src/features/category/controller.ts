import type { NextFunction, Request, Response } from "express";
import { CreateCategorySchema } from "./dto";
import { createCategoryService, getAllCategoryService } from "./service";

export const getAllCategoryController = async (
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await getAllCategoryService();
		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export const createCategoryController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const parsed = CreateCategorySchema.safeParse(req.body);

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

		const result = await createCategoryService(parsed.data);
		return res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};
