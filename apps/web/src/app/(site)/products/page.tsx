import type { SearchParams } from "nuqs/server";
import { getProducts } from "@/features/products/api/products";
import { MasonryGrid } from "@/features/products/components/masonry-grid";
import { ProductFilters } from "@/features/products/components/product-filters";
import { loadFilters } from "./search-params";

type ProductsPageProps = {
	searchParams: Promise<SearchParams>;
};

export default async function ProductsPage({
	searchParams,
}: ProductsPageProps) {
	const filters = await loadFilters(searchParams);

	const response = await getProducts(filters);

	if (!response.success) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<h2 className="font-bold text-2xl">Error loading products</h2>
					<p className="text-muted-foreground">{response.message}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="grid min-h-screen grid-cols-5 gap-4 px-4 md:gap-6">
			<ProductFilters className="hidden md:block" />
			<div className="col-span-5 md:col-span-4">
				<div>some content</div>
				<MasonryGrid
					products={response.data.products}
					pagination={response.data.pagination}
				/>
			</div>
		</div>
	);
}
