"use server";

import { env } from "@tcl-ecommerce/env/web";
import { cookies } from "next/headers";
import type { IApiResponse } from "@/types/api";
import type { IReviewStats } from "../types";

export async function getReviewsStats(productId: string) {
	const res = await fetch(
		`${env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}/reviews/stats`,
		{
			headers: {
				Cookie: (await cookies()).toString(),
			},
		},
	);

	if (!res.ok) {
		throw new Error("Failed to fetch product");
	}

	const data: IApiResponse<IReviewStats> = await res.json();

	if (!data.success || !data.data) {
		throw new Error(data.message || "Failed to fetch review stats");
	}

	return data.data;
}
