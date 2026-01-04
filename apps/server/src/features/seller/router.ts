import { Role } from "@tcl-ecommerce/db";
import { Router } from "express";
import { requireAuth, requireRoles } from "@/middlewares";
import { uploadProductImages } from "@/middlewares/upload";
import {
	approveSellerRegisterController,
	createSellerProductsController,
	deleteSellerController,
	getAllSellerController,
	listSellerProductsController,
	registerSellerController,
	sellerProfileController,
} from "./controller";

const router: Router = Router();

// Admin
router.get(
	"/admin/sellers",
	requireAuth,
	requireRoles([Role.ADMIN]),
	getAllSellerController,
);
router.post(
	"/admin/sellers/approve/:sellerId",
	requireAuth,
	requireRoles([Role.ADMIN]),
	approveSellerRegisterController,
);

// Seller
// List Products (for seller)
router.get(
	"/sellers/products",
	requireAuth,
	requireRoles([Role.SELLER]),
	listSellerProductsController,
);

// Register as seller (for customer)
router.post("/sellers/register", requireAuth, registerSellerController);

// Create Product (for seller)
router.post(
	"/sellers/products",
	requireAuth,
	requireRoles([Role.SELLER]),
	uploadProductImages.array("images", 5),
	createSellerProductsController,
);

// Seller Profile (for seller)
router.get(
	"/sellers/profile",
	requireAuth,
	requireRoles([Role.SELLER]),
	sellerProfileController,
);

// Delete Seller (for seller)
router.delete(
	"/sellers",
	requireAuth,
	requireRoles([Role.SELLER]),
	deleteSellerController,
);

export default router;
