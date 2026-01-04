import prisma from "@tcl-ecommerce/db";
import { ApiError } from "@/utils/api-error";
import { generateCategoryUniqueSlug } from "@/utils/generate-unique-slug";
import type { CreateCategoryType } from "./dto";

export const getAllCategoryService = async () => {
	const result = await prisma.category.findMany();
	return {
		status: "success",
		message: "Categories retrieved successfully",
		data: result,
	};
};

export const createCategoryService = async (data: CreateCategoryType) => {
	const { name, slug } = data;

	// If client provided slug, check if it is unique
	if (slug) {
		const existingCategory = await prisma.category.findUnique({
			where: { slug },
		});
		if (existingCategory) {
			throw ApiError.badRequest("Category with this slug already exists");
		}
	}

	const result = await prisma.category.create({
		data: {
			name,
			slug: slug
				? slug
				: await generateCategoryUniqueSlug(name, prisma.category),
		},
	});

	return {
		status: "success",
		message: "Category created successfully",
		data: result,
	};
};
