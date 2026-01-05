"use server";

import { env } from "@tcl-ecommerce/env/web";
import type { ApiResponse } from "@/types/api";
import type { Category } from "../types";

export const getCategories = async () => {
	const response = await fetch(`${env.NEXT_PUBLIC_SERVER_URL}/api/categories`);

	if (!response.ok) {
		throw new Error(`Failed to fetch categories: ${response.status}`);
	}

	const data: ApiResponse<Category[]> = await response.json();
	return data;
};
