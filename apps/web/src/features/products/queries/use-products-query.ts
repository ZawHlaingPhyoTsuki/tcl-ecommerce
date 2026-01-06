import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import type { ProductFilters } from "../types";

export const useProductsQuery = (filters?: Partial<ProductFilters>) => {
	return useQuery({
		queryKey: ["products", filters],
		queryFn: () => getProducts(filters || {}),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};
