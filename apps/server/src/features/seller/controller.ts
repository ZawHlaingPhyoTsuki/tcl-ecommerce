import type { NextFunction, Request, Response } from "express";
import {
	CreateSellerProductSchema,
	GetAllSellersQuerySchema,
	RegisterSellerSchema,
	SellerIdSchema,
} from "./dto";
import {
	approveSellerRegisterService,
	createSellerProductsService,
	deleteSellerService,
	getAllSellerService,
	listSellerProductsService,
	registerSellerService,
	sellerProfileService,
} from "./service";

// Admin
export const getAllSellerController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const parsed = GetAllSellersQuerySchema.safeParse(req.query);

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

		const result = await getAllSellerService(parsed.data);
		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export const approveSellerRegisterController = async (
	req: Request<{ sellerId: string }>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const parsed = SellerIdSchema.safeParse(req.params);

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

		const result = await approveSellerRegisterService(parsed.data.sellerId);
		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

// Seller
export const listSellerProductsController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await listSellerProductsService(req.user.id);
		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export const createSellerProductsController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const files = req.files as Express.Multer.File[] | undefined;

		const parsed = CreateSellerProductSchema.safeParse(req.body);

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

		const result = await createSellerProductsService(
			parsed.data,
			req.user.id,
			files,
		);

		return res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

export const registerSellerController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const parsed = RegisterSellerSchema.safeParse(req.body);

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

		const result = await registerSellerService(parsed.data, req.user.id);

		return res.status(201).json(result);
	} catch (error) {
		next(error); // Pass to error handler
	}
};

export const sellerProfileController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await sellerProfileService(req.user.id);
		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export const deleteSellerController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await deleteSellerService(req.user.id);
		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
