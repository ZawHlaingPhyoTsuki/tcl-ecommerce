import type { NextFunction, Request, Response } from "express";
import { getUserFavouritesService } from "./service";

export const getUserFavouritesController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await getUserFavouritesService(req.user.id);
		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
