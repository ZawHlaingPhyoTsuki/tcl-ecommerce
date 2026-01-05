"use server";

import type { ApiResponse } from "@/types/api";
import type { Category } from "../types";

export const getCategories = async () => {
	const response = await fetch("http://localhost:3000/api/categories");

	const data: ApiResponse<Category[]> = await response.json();
	return data;
};
