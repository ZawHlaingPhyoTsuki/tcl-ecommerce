import type { IProductWithRelations } from "@/features/products/types";
import type { IPagination } from "@/types/api";
import { ProductCard } from "./product-card";

interface MasonryGridProps {
	products: IProductWithRelations[];
	pagination: IPagination;
}

export function MasonryGrid({ products }: MasonryGridProps) {
	return (
		<div className="columns-1 gap-6 md:columns-2 lg:columns-3 xl:columns-4">
			{products.map((product) => (
				<div key={product.id} className="mb-6 break-inside-avoid">
					<ProductCard product={product} />
				</div>
			))}
		</div>
	);
}
