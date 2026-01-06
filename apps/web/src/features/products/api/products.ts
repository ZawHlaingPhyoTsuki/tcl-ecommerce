import type { Product, ProductFilters } from "../types";

export const getProducts = async (
	filters: Partial<ProductFilters>,
): Promise<Product[]> => {
	const params = new URLSearchParams();

	if (filters.search) params.append("search", filters.search);
	if (filters.category && filters.category.length > 0)
		params.append("category", filters.category.join(","));
	if (filters.minPrice) params.append("minPrice", filters.minPrice.toString());
	if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
	if (filters.inStock) params.append("inStock", "true");
	if (filters.sortBy) params.append("sortBy", filters.sortBy);

	const response = await fetch(`/api/products?${params.toString()}`);

	if (!response.ok) {
		throw new Error("Failed to fetch products");
	}

	return response.json();
};

// Server-side API will be in apps/server/src/features/product/router.ts
