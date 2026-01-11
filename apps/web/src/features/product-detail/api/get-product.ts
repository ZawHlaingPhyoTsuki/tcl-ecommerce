"use server";

import { env } from "@tcl-ecommerce/env/web";
import type { IApiResponse } from "@/types/api";
import type { IProductWithRelations } from "../types";

export async function getProduct(slug: string) {
	try {
		const res = await fetch(
			`${env.NEXT_PUBLIC_SERVER_URL}/api/products/${slug}`,
			{ cache: "no-store" },
		);

		if (!res.ok) {
			throw new Error("Failed to fetch product");
		}

		const data: IApiResponse<{ product: IProductWithRelations }> =
			await res.json();

		return data;
	} catch (error) {
		// throw error;
		console.error("Error fetching product:", error);
		return {
			success: false,
			message: "Failed to fetch product",
			data: null,
		};
	}
}
