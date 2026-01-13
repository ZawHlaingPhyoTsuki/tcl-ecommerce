import { queryOptions, useQuery } from "@tanstack/react-query";
import { getReviewsStats } from "../api/get-review-stats";
import type { IReviewStats } from "../types";

export const getReviewsStatsQueryOptions = (
	productId: string,
	initialData?: IReviewStats,
) =>
	queryOptions({
		queryKey: ["reviews-stats", productId],
		queryFn: () => getReviewsStats(productId),
		initialData,
	});

export const useGetReviewsStats = (
	productId: string,
	initialData?: IReviewStats,
) => {
	return useQuery(getReviewsStatsQueryOptions(productId, initialData));
};
