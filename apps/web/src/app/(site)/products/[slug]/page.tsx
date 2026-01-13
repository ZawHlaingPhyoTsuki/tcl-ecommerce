import ProductDetailContent from "@/features/product-detail/components/product-detail-content";

interface ProductDetailPageProps {
	params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({
	params,
}: ProductDetailPageProps) {
	const { slug } = await params;

	return <ProductDetailContent slug={slug} />;
}
