import { Router } from "express";
import { requireAuth } from "@/middlewares";
import {
	favoriteProductController,
	getAllProductsController,
	getProductBySlugController,
} from "./controller";

const router: Router = Router();

router.get("/", getAllProductsController);
router.post("/:productId/favorite", requireAuth, favoriteProductController);
router.get("/:slug", getProductBySlugController);

export default router;
