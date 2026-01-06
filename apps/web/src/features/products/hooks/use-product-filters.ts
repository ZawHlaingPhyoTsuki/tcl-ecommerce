"use client";

import { useQueryStates } from "nuqs";
import { filterSearchParams } from "@/app/(site)/products/search-params";

export function useProductFilters() {
	const [filters, setFilters] = useQueryStates(filterSearchParams, {
		shallow: true,
	});

	const updateFilters = (newFilters: Partial<typeof filters>) => {
		setFilters(newFilters);
	};

	const resetFilters = () => {
		setFilters({
			search: "",
			category: [],
			minPrice: 0,
			maxPrice: 10000,
			inStock: false,
			sortBy: "newest",
		});
	};

	return {
		filters,
		updateFilters,
		resetFilters,
	};
}
