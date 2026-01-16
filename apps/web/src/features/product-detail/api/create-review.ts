"use server";

import { env } from "@tcl-ecommerce/env/web";
import { cookies } from "next/headers";
import type { IApiResponse, IReview } from "@/types/api";
import type { CreateReviewType } from "../types";

export async function createReview(productId: string, body: CreateReviewType) {
	const res = await fetch(
		`${env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}/reviews`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: (await cookies()).toString(),
			},
			body: JSON.stringify(body),
		},
	);

	const data: IApiResponse<{ review: IReview }> = await res.json();

	if (!res.ok || !data.success) {
		throw new Error(data.message || "Failed to create review");
	}

	return data.data.review;
}
