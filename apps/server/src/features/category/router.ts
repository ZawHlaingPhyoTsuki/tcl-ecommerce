import { Role } from "@tcl-ecommerce/db";
import { Router } from "express";
import { requireAuth, requireRoles } from "@/middlewares";
import {
	createCategoryController,
	getAllCategoryController,
} from "./controller";

const router: Router = Router();

router.get("/", getAllCategoryController);
router.post(
	"/",
	requireAuth,
	requireRoles([Role.ADMIN]),
	createCategoryController,
);

export default router;
