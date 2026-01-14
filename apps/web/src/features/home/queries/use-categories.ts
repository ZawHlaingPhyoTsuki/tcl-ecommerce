import { queryOptions, useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/get-category";

export const getCategoriesQueryOptions = () =>
	queryOptions({
		queryKey: ["categories"],
		queryFn: () => getCategories(),
	});

export const useGetCategories = () => {
	return useQuery(getCategoriesQueryOptions());
};
