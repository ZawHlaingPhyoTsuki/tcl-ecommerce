import type { NextFunction, Request, Response } from "express";
import { formatZodError } from "@/common/utils/zod-error";
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
		const file = req.file as Express.Multer.File | undefined;

		const parsed = CreateCategorySchema.safeParse(req.body);

		if (!parsed.success) {
			return res.status(400).json({
				success: false,
				message: "Validation failed",
				errors: formatZodError(parsed.error),
			});
		}

		const result = await createCategoryService(parsed.data, file);
		return res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};
