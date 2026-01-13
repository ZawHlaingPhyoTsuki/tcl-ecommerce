import { Router } from "express";
import { optionalAuth, requireAuth } from "@/middlewares";
import {
	favoriteProductController,
	getAllProductsController,
	getProductBySlugController,
	getReviewsController,
	getReviewsStatsController,
	likeProductController,
	postReviewController,
} from "./controller";

const router: Router = Router();

router.get("/", getAllProductsController);
router.post("/:productId/favorite", requireAuth, favoriteProductController);
router.post("/:productId/like", requireAuth, likeProductController);
router.get("/:slug", optionalAuth, getProductBySlugController);

router.get("/:productId/reviews", getReviewsController);
router.post("/:productId/reviews", requireAuth, postReviewController);
router.get("/:productId/reviews/stats", getReviewsStatsController);

export default router;
