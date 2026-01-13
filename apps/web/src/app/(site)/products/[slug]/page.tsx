import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { getProduct } from "@/features/product-detail/api/get-product";
import Detail from "@/features/product-detail/components/detail";
import ReviewSection from "@/features/product-detail/components/review-section";
import Thumbnail from "@/features/product-detail/components/thumbnail";

interface ProductDetailPageProps {
	params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({
	params,
}: ProductDetailPageProps) {
	const { slug } = await params;

	const data = await getProduct(slug);

	if (!data.success || !data.data) {
		return notFound();
	}

	const product = data.data.product;

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
					<ReviewSection productId={product.id} />
				</div>
			</main>

			<Footer />
		</>
	);
}
