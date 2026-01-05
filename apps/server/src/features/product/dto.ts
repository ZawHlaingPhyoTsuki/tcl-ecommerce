import z from "zod";

export const GetAllProductsQuerySchema = z
	.object({
		// Pagination
		page: z.coerce.number().min(1).default(1),
		limit: z.coerce.number().min(1).max(100).default(20),

		// Search
		search: z.string().optional(),

		// Filters
		minPrice: z.coerce.number().int().min(0).optional(),
		maxPrice: z.coerce.number().int().min(0).optional(),
		categoryId: z.uuidv4({ error: "Invalid category ID format" }).optional(),
		sellerId: z.uuidv4({ error: "Invalid seller ID format" }).optional(),
		inStock: z.coerce.boolean().optional(),
		currency: z.enum(["BAHT", "KYAT"]).optional(),

		// Sorting
		sortBy: z
			.enum(["price-asc", "price-desc", "name-asc", "name-desc", "newest"])
			.default("newest"),
	})
	.transform((data) => {
		// Parse the combined sortBy into separate database fields
		const { sortBy: combinedSort, ...rest } = data;

		let sortField: "createdAt" | "name" | "price" = "createdAt";
		let sortOrder: "asc" | "desc" = "desc";

		switch (combinedSort) {
			case "price-asc":
				sortField = "price";
				sortOrder = "asc";
				break;
			case "price-desc":
				sortField = "price";
				sortOrder = "desc";
				break;
			case "name-asc":
				sortField = "name";
				sortOrder = "asc";
				break;
			case "name-desc":
				sortField = "name";
				sortOrder = "desc";
				break;
			case "newest":
				sortField = "createdAt";
				sortOrder = "desc";
				break;
		}

		return {
			...rest,
			sortField, // For database: "createdAt" | "name" | "price"
			sortOrder, // For database: "asc" | "desc"
			originalSortBy: combinedSort, // Keep original for reference
		};
	});

export const ProductIdSchema = z.object({
	productId: z.uuidv4({ error: "Invalid product ID format" }),
});

export type GetAllProductsQueryType = z.infer<typeof GetAllProductsQuerySchema>;
export type ProductIdType = z.infer<typeof ProductIdSchema>;
