"use server";

import { env } from "@tcl-ecommerce/env/web";
import type { IApiResponse, ICategory } from "@/types/api";

export const getCategories = async () => {
	try {
		const response = await fetch(
			`${env.NEXT_PUBLIC_SERVER_URL}/api/categories`,
			{
				cache: "no-store",
			},
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch categories: ${response.status}`);
		}

		const data: IApiResponse<ICategory[]> = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching categories:", error);
		return {
			success: false,
			message:
				error instanceof Error ? error.message : "Failed to fetch categories",
			data: [],
		};
	}
};
