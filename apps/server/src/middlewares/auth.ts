import { auth } from "@tcl-ecommerce/auth";
import prisma, { SellerStatus } from "@tcl-ecommerce/db";
import { fromNodeHeaders } from "better-auth/node";
import type { NextFunction, Request, Response } from "express";

export const requireAuth = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const session = await auth.api.getSession({
			headers: fromNodeHeaders(req.headers),
		});

		if (!session) {
			return res.status(401).json({ success: false, message: "Unauthorized" });
		}

		req.user = session.user;

		next();
	} catch (error) {
		console.error("Auth error:", error);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

export const optionalAuth = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const session = await auth.api.getSession({
			headers: fromNodeHeaders(req.headers),
		});

		if (!session) {
			return next();
		}

		req.user = session.user;

		next();
	} catch (error) {
		console.error("Auth error:", error);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

export const requireRoles = (roles: string[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		if (!req.user || !roles.includes(req.user.role)) {
			return res.status(403).json({ success: false, message: "Forbidden" });
		}

		// Additional validation for SELLER role
		if (req.user.role === "SELLER") {
			try {
				const seller = await prisma.seller.findUnique({
					where: { userId: req.user.id },
					select: { status: true },
				});

				if (!seller) {
					return res.status(403).json({
						success: false,
						message: "Forbidden - you are not registered as a seller",
					});
				}

				if (seller.status !== SellerStatus.APPROVED) {
					return res.status(403).json({
						success: false,
						message: getSellerStatusMessage(seller.status),
					});
				}
			} catch (error) {
				console.error("Seller validation error:", error);
				return res
					.status(500)
					.json({ success: false, message: "Internal server error" });
			}
		}

		next();
	};
};

function getSellerStatusMessage(status: SellerStatus): string {
	switch (status) {
		case SellerStatus.PENDING:
			return "Your seller account is still pending approval";
		case SellerStatus.REJECTED:
			return "Your seller account has been rejected";
		default:
			return "Your seller account is not approved";
	}
}
