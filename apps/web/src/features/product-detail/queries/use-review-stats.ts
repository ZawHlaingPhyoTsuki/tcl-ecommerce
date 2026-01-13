import { queryOptions, useQuery } from "@tanstack/react-query";
import { getReviewsStats } from "../api/get-review-stats";

export const getReviewsStatsQueryOptions = (productId: string) =>
	queryOptions({
		queryKey: ["reviews-stats", productId],
		queryFn: () => getReviewsStats(productId),
	});

export const useGetReviewsStats = (productId: string) => {
	return useQuery(getReviewsStatsQueryOptions(productId));
};
