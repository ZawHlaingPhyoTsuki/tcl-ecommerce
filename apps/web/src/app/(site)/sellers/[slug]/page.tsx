interface SellerDetailPageProps {
	params: Promise<{ slug: string }>;
}

export default async function SellerDetailPage({
	params,
}: SellerDetailPageProps) {
	const { slug } = await params;

	return <div>SellerDetailPage - {slug}</div>;
}
