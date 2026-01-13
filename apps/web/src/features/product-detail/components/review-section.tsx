import { getReviewsStats } from "@/features/product-detail/api/get-review-stats";
import { getReviews } from "@/features/product-detail/api/get-reviews";
import ReviewCards from "./review-cards";
import ReviewStats from "./review-stats";

interface ReviewSectionProps {
	productId: string;
}

export default async function ReviewSection({ productId }: ReviewSectionProps) {
	const [stats, reviews] = await Promise.all([
		getReviewsStats(productId),
		getReviews(productId),
	]);

	return (
		<>
			<h3 className="font-medium text-xl">Customer Reviews</h3>
			<ReviewStats productId={productId} initialData={stats} />
			<ReviewCards productId={productId} initialData={reviews} />
		</>
	);
}
