import { StarIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";

export default function ReviewCards() {
	return (
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
			<ReviewCard />
			<ReviewCard />
			<ReviewCard />
			<ReviewCard />
		</div>
	);
}

function ReviewCard() {
	return (
		<Card className="py-5">
			<CardHeader>
				<div className="flex items-start justify-between">
					{/* Left */}
					<div className="space-y-3">
						{/* Stars */}
						<div className="flex items-center gap-1">
							<StarIcon className="h-4 w-4" fill="currentColor" />
							<StarIcon className="h-4 w-4" fill="currentColor" />
							<StarIcon className="h-4 w-4" fill="currentColor" />
							<StarIcon className="h-4 w-4" fill="currentColor" />
							<StarIcon className="h-4 w-4" />
						</div>

						{/* Review Title */}
						<h3 className="font-medium">His Favourite Towel!</h3>

						{/* Product Info */}
						<div className="flex items-center gap-1 text-muted-foreground text-sm">
							<span>Color: Black</span>
							<span>•</span>
							<span>Size: XL</span>
						</div>
					</div>

					{/* Right */}
					<span className="text-muted-foreground text-sm">08 Augest 2024</span>
				</div>
			</CardHeader>

			<CardContent className="text-muted-foreground">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus vel ab
				dolores, aperiam commodi ratione corporis voluptatum? Deserunt nisi
				eligendi soluta ducimus beatae exercitationem eos? Dolorum minus porro
				reiciendis ipsum!
			</CardContent>

			<CardFooter className="gap-2 border-none bg-card pt-0 pb-2">
				<Button size="lg" variant="ghost" className="flex items-center gap-2">
					<ThumbsUpIcon className="h-6 w-6" />
					21
				</Button>
				<Button size="lg" variant="ghost" className="flex items-center gap-2">
					<ThumbsDownIcon className="h-6 w-6" />0
				</Button>
			</CardFooter>
		</Card>
	);
}
