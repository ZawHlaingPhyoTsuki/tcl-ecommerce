import { Share2Icon, StoreIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { IProductWithRelations } from "../types";
import FavoriteButton from "./action-button/favorite-button";
import LikeButton from "./action-button/like-button";
import WriteReviewButton from "./action-button/write-review-button";

interface DetailProps {
	product: IProductWithRelations;
	className?: string;
}

const currencyUtil = (currency: string) => {
	return (
		currency[0].toLocaleUpperCase() + currency.slice(1).toLocaleLowerCase()
	);
};

export default function Detail({ product, className }: DetailProps) {
	console.log({ product });

	return (
		<div className={cn("flex h-full flex-col space-y-5", className)}>
			{/* Title and Status Badges */}
			<div className="space-y-4">
				<h1 className="font-bold text-2xl leading-tight sm:text-3xl">
					{product.name}
				</h1>

				{/* Badge Group */}
				<div className="flex flex-wrap items-center gap-2">
					<Badge
						variant={product.stock > 10 ? "default" : "destructive"}
						className="px-3 py-1 text-sm"
					>
						{product.stock > 10
							? `${product.stock} in stock`
							: `Only ${product.stock} left`}
					</Badge>
					<Badge variant="outline" className="px-3 py-1 text-sm">
						{product.category.name}
					</Badge>
				</div>
			</div>

			{/* Price Section */}
			<span className="font-bold text-3xl text-primary sm:text-4xl">
				{currencyUtil(product.currency)} {product.price.toLocaleString()}
			</span>

			{/* Description */}
			<div className="space-y-3">
				<h3 className="font-semibold text-base sm:text-lg">
					Product Description
				</h3>
				<p className="text-muted-foreground text-sm leading-relaxed">
					{product.description}
				</p>
			</div>

			{/* Actions */}
			<div className="mt-auto space-y-5">
				{/* Main Actions - Save and Like */}
				<div className="flex gap-3">
					<FavoriteButton
						productId={product.id}
						slug={product.slug}
						initialFavorite={product.favorites.userFavorited}
					/>
					<LikeButton
						productId={product.id}
						slug={product.slug}
						initialLiked={product.likes.userLiked}
					/>
				</div>

				<Separator />

				{/* Secondary Actions - Write Review, View Shop, Share */}
				<div className="flex items-center justify-evenly space-x-4">
					<WriteReviewButton productId={product.id} />

					<Separator orientation="vertical" />

					<Button variant="ghost" size="lg" className="flex-1" asChild>
						<Link href={`/sellers/${product.seller.slug}`}>
							<StoreIcon className="h-4 w-4" /> View Shop
						</Link>
					</Button>

					<Separator orientation="vertical" />

					<Button variant="ghost" size="lg" className="flex-1">
						<Share2Icon className="h-4 w-4" /> Share
					</Button>
				</div>
			</div>
		</div>
	);
}
