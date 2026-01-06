import { ProductFilters } from "@/features/products/components/product-filters";
import { ProductGrid } from "@/features/products/components/product-grid";

export default async function ProductsPage() {
	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="font-bold text-3xl text-white">Products</h1>
					<p className="mt-2 text-white">
						Discover amazing products from our sellers
					</p>
				</div>

				{/* Main Layout */}
				<div className="flex flex-col gap-8 lg:flex-row">
					{/* Filters Sidebar - 1/5 width */}
					<div className="lg:w-1/5">
						<div className="sticky top-8">
							<div className="rounded-lg border p-6 shadow-sm">
								<h2 className="mb-4 font-semibold text-lg">Filters</h2>
								<ProductFilters />
							</div>
						</div>
					</div>

					{/* Products Grid - 4/5 width */}
					<div className="lg:w-4/5">
						<div className="mb-6 flex items-center justify-between">
							<p className="text-gray-600">
								Showing{" "}
								<span className="font-semibold">{/* Product count */}</span>{" "}
								products
							</p>
						</div>

						<ProductGrid />
					</div>
				</div>
			</div>
		</div>
	);
}
