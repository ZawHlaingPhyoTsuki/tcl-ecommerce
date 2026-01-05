import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductFilters } from "../types";

interface ProductStore {
	filters: ProductFilters;
	updateFilters: (filters: Partial<ProductFilters>) => void;
	resetFilters: () => void;
}

const defaultFilters: ProductFilters = {
	search: "",
	category: [],
	minPrice: 0,
	maxPrice: 10000,
	inStock: false,
	sortBy: "newest",
};

export const useProductStore = create<ProductStore>()(
	persist(
		(set) => ({
			filters: defaultFilters,
			updateFilters: (newFilters) =>
				set((state) => ({
					filters: { ...state.filters, ...newFilters },
				})),
			resetFilters: () => set({ filters: defaultFilters }),
		}),
		{ name: "product-filters" },
	),
);
