import z from "zod";
import { PaginationSchema, ProductIdSchema } from "@/common/dto";

export const GetAllProductsQuerySchema = PaginationSchema.extend({
	// Search
	search: z.string().optional(),

	// Filters
	minPrice: z.coerce.number().int().min(0).optional(),
	maxPrice: z.coerce.number().int().min(0).optional(),
	categorySlug: z.string().optional(),
	sellerSlug: z.string().optional(),
	inStock: z.coerce.boolean().optional(),

	// Sorting
	sortBy: z
		.enum(["price-asc", "price-desc", "name-asc", "name-desc", "newest"])
		.default("newest"),
})
	.refine(
		(data) => {
			if (data.minPrice !== undefined && data.maxPrice !== undefined) {
				return data.minPrice <= data.maxPrice;
			}
			return true;
		},
		{ message: "minPrice must be less than or equal to maxPrice" },
	)
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

export const GetAllReviewsQuerySchema = ProductIdSchema.extend(
	PaginationSchema.shape,
);

export const PostReviewSchema = ProductIdSchema.extend({
	rating: z.number().int().min(1).max(5),
	comment: z.string().trim().optional(),
});

export type GetAllProductsQueryType = z.infer<typeof GetAllProductsQuerySchema>;
export type GetAllReviewsQueryType = z.infer<typeof GetAllReviewsQuerySchema>;
export type CreateReviewType = z.infer<typeof PostReviewSchema>;
