import { StarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function ReviewInfo() {
	return (
		<Card>
			<CardContent className="flex items-center justify-evenly gap-4">
				{/* Left Part */}
				<LeftItem />

				<Separator orientation="vertical" />

				{/* Right Part */}
				<RightItem />
			</CardContent>
		</Card>
	);
}

function LeftItem({ className }: { className?: string }) {
	return (
		<div className={cn("flex w-full items-center gap-4", className)}>
			<ProgressCircle value={80} className="size-20" />

			<div className="flex flex-col gap-2">
				{/* Stars */}
				<div className="mb-3 flex items-center gap-1">
					<StarIcon fill="currentColor" />
					<StarIcon fill="currentColor" />
					<StarIcon fill="currentColor" />
					<StarIcon fill="currentColor" />
					<StarIcon />
				</div>

				{/* Text */}
				<span className="font-medium">95 % of customers are satisfied</span>

				{/* Ratings */}
				<div className="flex items-center gap-2 text-muted-foreground text-sm">
					<span>96 rating</span>
					<span>•</span>
					<span>1234 reviews</span>
				</div>
			</div>
		</div>
	);
}

function RightItem({ className }: { className?: string }) {
	return (
		<div className={cn("flex w-full flex-col", className)}>
			<div className="flex w-full items-center gap-2">
				<StarIcon fill="currentColor" />
				<span>5</span>
				<Progress value={80} />
				<span>136</span>
			</div>
			<div className="flex w-full items-center gap-2">
				<StarIcon fill="currentColor" />
				<span>4</span>
				<Progress value={80} />
				<span>33</span>
			</div>
			<div className="flex w-full items-center gap-2">
				<StarIcon fill="currentColor" />
				<span>3</span>
				<Progress value={80} />
				<span>9</span>
			</div>
			<div className="flex w-full items-center gap-2">
				<StarIcon fill="currentColor" />
				<span>2</span>
				<Progress value={80} />
				<span>10</span>
			</div>
			<div className="flex w-full items-center gap-2">
				<StarIcon fill="currentColor" />
				<span>1</span>
				<Progress value={80} />
				<span>2</span>
			</div>
		</div>
	);
}
