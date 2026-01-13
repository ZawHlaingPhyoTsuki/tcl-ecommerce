"use server";

import { env } from "@tcl-ecommerce/env/web";
import { cookies } from "next/headers";
import type { IApiResponse } from "@/types/api";

export async function toggleFavorite(productId: string) {
	const res = await fetch(
		`${env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}/favorite`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: (await cookies()).toString(),
			},
		},
	);

	const data: IApiResponse<{ favorited: boolean }> = await res.json();

	if (!res.ok || !data.success) {
		throw new Error(data.message || "Failed to toggle favorite");
	}

	return data.data;
}
