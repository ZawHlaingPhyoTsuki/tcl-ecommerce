import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { IProductWithRelations } from "../types";

interface DetailProps {
	product: IProductWithRelations;
	className?: string;
}

export default function Detail({ product, className }: DetailProps) {
	return (
		<div className={cn("flex h-full flex-col space-y-5", className)}>
			{/* Title */}
			<div className="space-y-3">
				<h1 className="font-semibold text-3xl leading-tight">{product.name}</h1>
				<div className="flex items-center gap-4 text-muted-foreground text-sm">
					<span>{product.rating.average.toFixed(1)} ⭐</span>
					<span>•</span>
					<span>{product.rating.count} reviews</span>
					<span>•</span>
					<Badge variant="secondary">{product.category.name}</Badge>
				</div>
			</div>

			<Separator />

			{/* Price */}
			<div>
				<p className="font-bold text-3xl text-primary">
					{product.currency} {product.price.toLocaleString()}
				</p>
				<p className="text-muted-foreground text-sm">Stock: {product.stock}</p>
			</div>

			{/* Description */}
			<div className="space-y-2">
				<h3 className="font-medium">Product Description</h3>
				<p className="whitespace-pre-line text-muted-foreground text-sm">
					{product.description}
				</p>
			</div>

			{/* Actions */}
			<div className="mt-auto space-y-5">
				<div className="flex gap-3">
					<Button size="lg" className="flex-1">
						Add to Cart
					</Button>
					<Button size="lg" variant="outline" className="flex-1">
						Favorite
					</Button>
				</div>

				<Separator />

				<div className="flex items-center justify-evenly space-x-4">
					<Button variant="ghost" size="lg" className="flex-1">
						<MessageCircle className="h-4 w-4" /> Chat
					</Button>

					<Separator orientation="vertical" />

					<Button variant="ghost" size="lg" className="flex-1">
						<Heart className="h-4 w-4" /> Like
					</Button>

					<Separator orientation="vertical" />

					<Button variant="ghost" size="lg" className="flex-1">
						<Share2 className="h-4 w-4" /> Share
					</Button>
				</div>
			</div>
		</div>
	);
}
