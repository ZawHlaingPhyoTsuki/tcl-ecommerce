"use server";

import { env } from "@tcl-ecommerce/env/web";
import type { IApiResponse } from "@/types/api";
import type { IProductsResponse } from "../types";

export type Filters = {
	page: number;
	limit: number;
	search: string;
	minPrice: number | null;
	maxPrice: number | null;
	category: string[] | null;
	sellerId: string | null;
	inStock: boolean | null;
	sortBy: NonNullable<
		"newest" | "price-asc" | "price-desc" | "name-asc" | "name-desc"
	>;
};

export const getProducts = async (
	filters: Filters,
): Promise<IApiResponse<IProductsResponse>> => {
	// Convert filters to query parameters
	const queryParams = new URLSearchParams();

	queryParams.append("page", filters.page.toString());
	queryParams.append("limit", filters.limit.toString());
	queryParams.append("search", filters.search);
	queryParams.append("sortBy", filters.sortBy);

	if (filters.minPrice !== null) {
		queryParams.append("minPrice", filters.minPrice.toString());
	}

	if (filters.maxPrice !== null) {
		queryParams.append("maxPrice", filters.maxPrice.toString());
	}

	if (filters.category) {
		filters.category.forEach((cat) => {
			queryParams.append("category", cat);
		});
	}

	if (filters.sellerId !== null) {
		queryParams.append("sellerId", filters.sellerId);
	}

	if (filters.inStock !== null) {
		queryParams.append("inStock", filters.inStock.toString());
	}

	const response = await fetch(
		`${env.NEXT_PUBLIC_SERVER_URL}/api/products?${queryParams.toString()}`,
	);

	if (!response.ok) {
		throw new Error("Failed to fetch products");
	}

	return response.json();
};
