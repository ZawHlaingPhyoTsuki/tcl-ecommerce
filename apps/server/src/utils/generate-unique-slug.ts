import type { PrismaClient } from "@tcl-ecommerce/db";
import slugify from "slugify";
import { ApiError } from "./api-error";

async function generateUniqueSlugHelper<T extends { slug: string }>(
	base: string,
	findUnique: (where: { slug: string }) => Promise<T | null>,
) {
	const slug = slugify(base, { lower: true, strict: true, trim: true });

	let uniqueSlug = slug;
	let suffix = 1;
	const maxRetries = 100;

	while (suffix <= maxRetries && (await findUnique({ slug: uniqueSlug }))) {
		uniqueSlug = `${slug}-${suffix++}`;
	}

	if (suffix > maxRetries) {
		throw ApiError.badRequest("Failed to generate a unique slug");
	}

	return uniqueSlug;
}

export async function generateSellerUniqueSlug(
	base: string,
	model: Pick<PrismaClient["seller"], "findUnique">,
) {
	return generateUniqueSlugHelper(base, (where) => model.findUnique({ where }));
}

export async function generateProductUniqueSlug(
	base: string,
	model: Pick<PrismaClient["product"], "findUnique">,
) {
	return generateUniqueSlugHelper(base, (where) => model.findUnique({ where }));
}

export async function generateCategoryUniqueSlug(
	base: string,
	model: Pick<PrismaClient["category"], "findUnique">,
) {
	return generateUniqueSlugHelper(base, (where) => model.findUnique({ where }));
}
