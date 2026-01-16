"use client";

import { StarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useGetReviewsStats } from "../queries/use-review-stats";
import type { IReviewStats } from "../types";

interface ReviewStatsProps {
	productId: string;
	likeCount: number;
}

export default function ReviewStats({
	productId,
	likeCount,
}: ReviewStatsProps) {
	const { data, isLoading, isError } = useGetReviewsStats(productId);

	if (isLoading) return <div>Loading...</div>;

	if (isError || !data) return <div>Failed to load stats</div>;

	return (
		<Card>
			<CardContent className="flex flex-col items-center justify-evenly gap-4 md:flex-row">
				{/* Left Part */}
				<LeftItem reviewStats={data} likeCount={likeCount} />

				<Separator orientation="vertical" />

				{/* Right Part */}
				<RightItem reviewStats={data} />
			</CardContent>
		</Card>
	);
}

function LeftItem({
	reviewStats,
	likeCount,
	className,
}: {
	reviewStats: IReviewStats;
	likeCount: number;
	className?: string;
}) {
	if (reviewStats.total === 0) {
		return (
			<div className={cn("flex w-full items-center gap-4", className)}>
				<span className="text-muted-foreground">No reviews yet</span>
				<span className="text-muted-foreground text-sm">
					• {likeCount} likes
				</span>
			</div>
		);
	}

	const ratingPercentage = (reviewStats.average / 5) * 100;

	const rating = reviewStats?.average;

	const fullStars = Math.floor(rating);
	const hasHalfStar = rating - fullStars >= 0.5;
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	return (
		<div className={cn("flex w-full items-center gap-4", className)}>
			<ProgressCircle value={ratingPercentage} className="size-20" />

			<div className="flex flex-col gap-2">
				{/* Stars */}
				<div className="mb-3 flex items-center gap-1">
					{/* Full stars */}
					{Array.from({ length: fullStars }).map((_, i) => (
						<StarIcon key={`full-${i + 1}`} fill="orange" stroke="orange" />
					))}

					{/* Half star */}
					{hasHalfStar && <HalfStar />}

					{/* Empty stars */}
					{Array.from({ length: emptyStars }).map((_, i) => (
						<StarIcon key={`empty-${i + 1}`} fill="none" stroke="orange" />
					))}
				</div>

				{/* Text */}
				<span className="font-medium">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</span>

				{/* Ratings */}
				<div className="flex items-center gap-2 text-muted-foreground text-sm">
					<span>
						{reviewStats.total} {reviewStats.total === 1 ? "review" : "reviews"}
					</span>
					<span>•</span>
					<span>{likeCount} likes</span>
				</div>
			</div>
		</div>
	);
}

function RightItem({
	reviewStats,
	className,
}: {
	reviewStats: IReviewStats;
	className?: string;
}) {
	const data = reviewStats.breakdown;

	return (
		<div className={cn("flex w-full flex-col", className)}>
			{data.map((item) => (
				<div key={item.star} className="flex w-full items-center gap-2">
					<StarIcon fill="orange" stroke="orange" />
					<span className="text-muted-foreground">{item.star}</span>
					<Progress value={item.percentage} max={100} />
					<span className="w-10 text-end font-semibold text-base">
						{item.count}
					</span>
				</div>
			))}
		</div>
	);
}

function HalfStar() {
	return (
		<span className="relative inline-block h-6 w-6 border-none">
			{/* Empty star (stroke) */}
			<StarIcon className="absolute inset-0" fill="none" stroke="orange" />

			{/* Half filled star */}
			<StarIcon
				className="absolute inset-0"
				fill="orange"
				stroke="orange"
				style={{ clipPath: "inset(0 50% 0 0)" }}
			/>
		</span>
	);
}
