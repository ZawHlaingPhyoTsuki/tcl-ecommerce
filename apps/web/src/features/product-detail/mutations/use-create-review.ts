import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createReview } from "../api/create-review";
import { getReviewsStatsQueryOptions } from "../queries/use-review-stats";
import { getReviewsQueryOptions } from "../queries/use-reviews";
import type { CreateReviewType } from "../types";

export const useCreateReview = (productId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (body: CreateReviewType) => createReview(productId, body),
		onSuccess: () => {
			toast.success("Review created successfully");
			queryClient.invalidateQueries({
				queryKey: getReviewsQueryOptions(productId).queryKey,
			});
			queryClient.invalidateQueries({
				queryKey: getReviewsStatsQueryOptions(productId).queryKey,
			});
		},
		onError: (error) => {
			toast.error(error.message || "Failed to create review");
			console.error(error);
		},
	});
};
