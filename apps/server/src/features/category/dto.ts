import z from "zod";

export const CreateCategorySchema = z.object({
	name: z
		.string()
		.min(3, "Name must be at least 3 characters")
		.max(100, "Name too long"),
	slug: z
		.string()
		.toLowerCase()
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug")
		.min(3, "Slug must be at least 3 characters")
		.max(100, "Slug too long")
		.optional(),
});

export type CreateCategoryType = z.infer<typeof CreateCategorySchema>;
