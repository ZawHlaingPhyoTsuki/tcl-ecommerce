import { queryOptions, useQuery } from "@tanstack/react-query";
import type { IPagination } from "@/types/api";
import { getReviews } from "../api/get-reviews";
import type { IReviewWithUser } from "../types";

interface ReviewsData {
	reviews: IReviewWithUser[];
	pagination: IPagination;
}

export const getReviewsQueryOptions = (
	productId: string,
	initialData?: ReviewsData,
) =>
	queryOptions({
		queryKey: ["reviews", productId],
		queryFn: () => getReviews(productId),
		initialData,
	});

export const useGetReviews = (productId: string, initialData?: ReviewsData) => {
	return useQuery(getReviewsQueryOptions(productId, initialData));
};
