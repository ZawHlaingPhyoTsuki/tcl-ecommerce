"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useProductsQuery } from "../queries/use-products-query";
import { ProductCard } from "./product-card";

export function ProductGrid() {
	const { data: products, isLoading, error } = useProductsQuery();

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 8 }).map((_, i) => (
					<div key={i} className="space-y-3">
						<Skeleton className="aspect-square rounded-lg" />
						<Skeleton className="h-4 w-2/3" />
						<Skeleton className="h-4 w-1/3" />
					</div>
				))}
			</div>
		);
	}

	if (error) {
		return (
			<div className="py-12 text-center">
				<p className="text-red-500">Failed to load products</p>
				<p className="mt-2 text-gray-500 text-sm">Please try again later</p>
			</div>
		);
	}

	if (!products?.length) {
		return (
			<div className="py-12 text-center">
				<p className="text-gray-500">No products found</p>
				<p className="mt-2 text-gray-400 text-sm">Try adjusting your filters</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}
