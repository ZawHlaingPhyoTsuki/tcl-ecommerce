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
	category: string | null;
	seller: string | null;
	inStock: boolean | null;
	sortBy: "newest" | "price-asc" | "price-desc" | "name-asc" | "name-desc";
};

export const getProducts = async (
	filters: Filters,
): Promise<IApiResponse<IProductsResponse>> => {
	// Convert filters to query parameters
	const queryParams = new URLSearchParams();

	queryParams.append("page", filters.page.toString());
	queryParams.append("limit", filters.limit.toString());
	queryParams.append("sortBy", filters.sortBy);

	if (filters.search) {
		queryParams.append("search", filters.search);
	}

	if (filters.minPrice !== null) {
		queryParams.append("minPrice", filters.minPrice.toString());
	}

	if (filters.maxPrice !== null) {
		queryParams.append("maxPrice", filters.maxPrice.toString());
	}

	if (filters.category) {
		queryParams.append("category", filters.category);
	}

	if (filters.seller) {
		queryParams.append("seller", filters.seller);
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
