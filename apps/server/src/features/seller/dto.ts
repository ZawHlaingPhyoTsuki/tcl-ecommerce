import z from "zod";
import { PaginationSchema } from "@/common/dto";

// Admin
export const GetAllSellersQuerySchema = PaginationSchema.extend({
	search: z.string().optional(),
	status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
	sortBy: z.enum(["createdAt", "shopName"]).default("createdAt"),
	sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type GetAllSellersQueryType = z.infer<typeof GetAllSellersQuerySchema>;

// Seller
export const CreateSellerProductSchema = z.object({
	name: z
		.string()
		.min(3, "Name must be at least 3 characters")
		.max(100, "Name too long"),
	slug: z
		.string()
		.toLowerCase()
		.regex(
			/^[a-z0-9-]+$/,
			"Slug can only contain lowercase letters, numbers, and hyphens",
		)
		.min(3, "Slug must be at least 3 characters")
		.max(100, "Slug too long")
		.optional(),
	description: z.string().min(10, "Description must be at least 10 characters"),
	price: z.coerce
		.number()
		.int({ error: "Price must be an integer" })
		.min(0, "Price must be at least 0")
		.max(1000000, "Price too high"),
	currency: z
		.enum(["BAHT", "KYAT"], { error: "Currency must be BAHT or KYAT" })
		.default("BAHT"),
	stock: z.coerce
		.number()
		.int({ error: "Stock must be an integer" })
		.min(0, "Stock must be at least 0")
		.max(1000000, "Stock too high"),
	categoryId: z.uuidv4({ error: "Invalid category ID format" }),
});

export const RegisterSellerSchema = z.object({
	shopName: z
		.string()
		.min(3, "Shop name must be at least 3 characters")
		.max(100, "Shop name too long"),
	slug: z
		.string()
		.toLowerCase()
		.regex(
			/^[a-z0-9-]+$/,
			"Slug can only contain lowercase letters, numbers, and hyphens",
		)
		.min(3, "Slug must be at least 3 characters")
		.max(100)
		.optional(),
	bio: z.string().max(500, "Bio too long").optional(),
	phone: z.string().max(20).optional(),
	address: z.string().max(255).optional(),
});

export type RegisterSellerType = z.infer<typeof RegisterSellerSchema>;
export type CreateSellerProductType = z.infer<typeof CreateSellerProductSchema>;

// Customer
