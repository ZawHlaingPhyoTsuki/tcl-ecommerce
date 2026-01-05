import { Role } from "@tcl-ecommerce/db";
import { Router } from "express";
import { requireAuth, requireRoles } from "@/middlewares";
import { uploadCategoryImage } from "@/middlewares/upload";
import {
	createCategoryController,
	getAllCategoryController,
} from "./controller";

const router: Router = Router();

router.get("/", getAllCategoryController);

// Admin routes
router.post(
	"/",
	requireAuth,
	requireRoles([Role.ADMIN]),
	uploadCategoryImage.single("image"),
	createCategoryController,
);

export default router;
