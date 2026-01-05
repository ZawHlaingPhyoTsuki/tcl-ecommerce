import { Router } from "express";
import { requireAuth } from "@/middlewares";
import {
	favoriteProductController,
	getAllProductsController,
} from "./controller";

const router: Router = Router();

router.get("/", getAllProductsController);
router.post("/:productId/favorite", requireAuth, favoriteProductController);

export default router;
