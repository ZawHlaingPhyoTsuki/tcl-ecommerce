import { Router } from "express";
import { requireAuth } from "@/middlewares";
import {
	favoriteProductController,
	getAllProductsController,
} from "./controller";

const router: Router = Router();

router.get("/", getAllProductsController);
router.post("/:id/favorite", requireAuth, favoriteProductController);

export default router;
