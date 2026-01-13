import { env } from "@tcl-ecommerce/env/web";
import type { IApiResponse } from "@/types/api";
import type { IProductWithRelations } from "../types";

export async function getProduct(slug: string) {
	const res = await fetch(
		`${env.NEXT_PUBLIC_SERVER_URL}/api/products/${slug}`,
		{
			credentials: "include",
		},
	);

	if (!res.ok) {
		throw new Error("Failed to fetch product");
	}

	const data: IApiResponse<{ product: IProductWithRelations }> =
		await res.json();

	if (!data.success || !data.data) {
		throw new Error(data.message || "Product not found");
	}

	return data.data.product;
}
