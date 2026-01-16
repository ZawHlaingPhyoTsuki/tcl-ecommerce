import { queryOptions, useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/get-product";

export const getProductQueryOptions = (slug: string) =>
	queryOptions({
		queryKey: ["product", slug],
		queryFn: () => getProduct(slug),
		enabled: !!slug,
	});

export const useGetProduct = (slug: string) => {
	return useQuery(getProductQueryOptions(slug));
};
