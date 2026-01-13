"use client";

import { formatDistanceToNow } from "date-fns";
import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetReviews } from "../queries/use-reviews";
import type { IReviewWithUser } from "../types";

interface ReviewCardsProps {
	productId: string;
}

export default function ReviewCards({ productId }: ReviewCardsProps) {
	const { data, isLoading, isError } = useGetReviews(productId);

	if (isLoading) return <div>Loading...</div>;

	if (isError || !data) return <div>Error loading reviews</div>;

	return (
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
			{data.reviews.map((review) => (
				<ReviewCard key={review.id} review={review} />
			))}
		</div>
	);
}

function renderStars(rating: number) {
	return Array.from({ length: 5 }).map((_, i) => (
		<StarIcon
			key={`star-${i + 1}`}
			className="h-4 w-4"
			fill={i < rating ? "currentColor" : "none"}
		/>
	));
}

function ReviewCard({ review }: { review: IReviewWithUser }) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between gap-4">
				{/* User */}
				<div className="flex items-center gap-3">
					<Avatar className="h-9 w-9">
						<AvatarImage src={review.user?.image || ""} />
						<AvatarFallback>{review.user?.name?.[0] ?? "U"}</AvatarFallback>
					</Avatar>

					<div className="flex flex-col">
						<span className="font-medium text-sm">
							{review.user?.name || "User"}
						</span>

						<div className="flex items-center gap-1">
							{renderStars(review.rating)}
						</div>
					</div>
				</div>

				{/* Date */}
				<span className="text-muted-foreground text-xs">
					{formatDistanceToNow(new Date(review.createdAt), {
						addSuffix: true,
					})}
				</span>
			</CardHeader>

			<CardContent className="text-muted-foreground text-sm">
				{review.comment ? (
					review.comment
				) : (
					<span className="text-muted-foreground/70 italic">
						No comment provided.
					</span>
				)}
			</CardContent>
		</Card>
	);
}
