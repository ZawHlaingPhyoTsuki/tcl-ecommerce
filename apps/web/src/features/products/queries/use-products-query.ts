import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { useProductStore } from "../hooks/use-product-store";

export const useProductsQuery = () => {
	const { filters } = useProductStore();

	return useQuery({
		queryKey: ["products", filters],
		queryFn: () => getProducts(filters),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};
