import prisma, { type Category } from "@tcl-ecommerce/db";
import { ApiError } from "@/common/utils/api-error";
import {
	deleteFromCloudinary,
	uploadToCloudinary,
} from "@/common/utils/cloudinary";
import { generateCategoryUniqueSlug } from "@/common/utils/generate-unique-slug";
import type { CreateCategoryType } from "./dto";

export const getAllCategoryService = async () => {
	const result = await prisma.category.findMany();
	return {
		success: true,
		message: "Categories retrieved successfully",
		data: result,
	};
};

export const createCategoryService = async (
	data: CreateCategoryType,
	file?: Express.Multer.File,
) => {
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

	// Upload single image
	let uploadResult: {
		url: string;
		publicId: string;
		width: number;
		height: number;
	} | null = null;
	if (file) {
		const folder = "tachileik-shop/category";
		uploadResult = await uploadToCloudinary(file.buffer, { folder });
	}

	let result: Omit<Category, "imagePublicId">;

	try {
		result = await prisma.category.create({
			data: {
				name,
				slug: slug
					? slug
					: await generateCategoryUniqueSlug(name, prisma.category),
				imageUrl: uploadResult?.url || null,
				imagePublicId: uploadResult?.publicId || null,
				imageWidth: uploadResult?.width || null,
				imageHeight: uploadResult?.height || null,
			},
			select: {
				id: true,
				slug: true,
				name: true,
				imageUrl: true,
				imageWidth: true,
				imageHeight: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	} catch (error) {
		// Cleanup uploaded image if creation fails
		if (uploadResult?.publicId) {
			try {
				await deleteFromCloudinary(uploadResult.publicId);
			} catch (error) {
				console.error("Failed to cleanup uploaded image:", error);
			}
		}
		throw error;
	}

	return {
		success: true,
		message: "Category created successfully",
		data: result,
	};
};
