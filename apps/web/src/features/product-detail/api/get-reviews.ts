"use server";

import { env } from "@tcl-ecommerce/env/web";
import { cookies } from "next/headers";
import type { IApiResponse, IPagination } from "@/types/api";
import type { IReviewWithUser } from "../types";

export async function getReviews(productId: string) {
	const res = await fetch(
		`${env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}/reviews`,
		{
			headers: {
				Cookie: (await cookies()).toString(),
			},
		},
	);

	if (!res.ok) {
		throw new Error("Failed to fetch product");
	}

	const data: IApiResponse<{
		reviews: IReviewWithUser[];
		pagination: IPagination;
	}> = await res.json();

	if (!data.success || !data.data) {
		throw new Error(data.message || "Failed to fetch review stats");
	}

	return data.data;
}
