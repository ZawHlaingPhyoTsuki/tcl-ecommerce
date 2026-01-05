import { Router } from "express";
import { requireAuth } from "@/middlewares";
import { getUserFavouriteProductsController } from "./controller";

const router: Router = Router();

router.get("/me/favourites", requireAuth, getUserFavouriteProductsController);

export default router;
