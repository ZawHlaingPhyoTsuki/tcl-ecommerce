import ReviewCards from "./review-cards";
import ReviewStats from "./review-stats";

interface ReviewSectionProps {
	productId: string;
	likeCount: number;
}

export default function ReviewSection({
	productId,
	likeCount,
}: ReviewSectionProps) {
	return (
		<>
			<h3 className="font-medium text-xl">Customer Reviews</h3>
			<ReviewStats productId={productId} likeCount={likeCount} />
			<ReviewCards productId={productId} />
		</>
	);
}
