"use server";

import { env } from "@tcl-ecommerce/env/web";
import { cookies } from "next/headers";
import type { IApiResponse } from "@/types/api";

export async function toggleLike(productId: string) {
	const res = await fetch(
		`${env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}/like`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: (await cookies()).toString(),
			},
		},
	);

	const data: IApiResponse<{ liked: boolean; count: number }> =
		await res.json();

	if (!res.ok || !data.success) {
		throw new Error(data.message || "Failed to toggle like");
	}

	return data.data;
}
