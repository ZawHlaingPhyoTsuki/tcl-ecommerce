import { queryOptions, useQuery } from "@tanstack/react-query";
import { getReviews } from "../api/get-reviews";

export const getReviewsQueryOptions = (productId: string) =>
	queryOptions({
		queryKey: ["reviews", productId],
		queryFn: () => getReviews(productId),
	});

export const useGetReviews = (productId: string) => {
	return useQuery(getReviewsQueryOptions(productId));
};
