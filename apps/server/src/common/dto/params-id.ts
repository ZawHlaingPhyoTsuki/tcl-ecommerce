import z from "zod";

export const UserIdSchema = z.object({
	userId: z.uuidv4({ error: "Invalid user ID format" }),
});

export const SellerIdSchema = z.object({
	sellerId: z.uuidv4({ error: "Invalid seller ID format" }),
});

export const ProductIdSchema = z.object({
	productId: z.uuidv4({ error: "Invalid product ID format" }),
});

export const CategoryIdSchema = z.object({
	categoryId: z.uuidv4({ error: "Invalid category ID format" }),
});

export type UserIdType = z.infer<typeof UserIdSchema>;
export type SellerIdType = z.infer<typeof SellerIdSchema>;
export type ProductIdType = z.infer<typeof ProductIdSchema>;
export type CategoryIdType = z.infer<typeof CategoryIdSchema>;
