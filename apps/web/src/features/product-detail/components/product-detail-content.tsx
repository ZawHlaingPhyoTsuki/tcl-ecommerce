"use client";

import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import Loader from "@/components/loader";
import { useGetProduct } from "../queries/use-product";
import Detail from "./detail";
import ReviewSection from "./review-section";
import Thumbnail from "./thumbnail";

interface ProductDetailContentProps {
	slug: string;
}

export default function ProductDetailContent({
	slug,
}: ProductDetailContentProps) {
	const { data: product, isLoading, isError } = useGetProduct(slug);

	if (isLoading) {
		return <Loader />;
	}

	if (isError || !product) {
		return notFound();
	}

	return (
		<>
			<main className="container mx-auto mb-10 max-w-6xl px-4">
				{/* Breadcrumb */}
				<div className="my-4 text-muted-foreground text-sm">
					Home / Products / {product.name}
				</div>

				{/* Main Section */}
				<div className="grid grid-cols-1 space-y-6 lg:grid-cols-9 lg:gap-14 lg:space-y-0">
					<Thumbnail className="col-span-5" product={product} />
					<Detail className="col-span-4" product={product} />
				</div>

				{/* Reviews Section */}
				<div className="mt-8 space-y-4">
					<ReviewSection
						productId={product.id}
						likeCount={product.likes.count}
					/>
				</div>
			</main>

			<Footer />
		</>
	);
}
