"use client";

import { Share2Icon, StoreIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { IProductWithRelations } from "../../types";
import FavoriteButton from "./favorite-button";
import LikeButton from "./like-button";
import WriteReviewButton from "./write-review-button";

interface ProductActionsProps {
	product: IProductWithRelations;
}

export default function ProductActions({ product }: ProductActionsProps) {
	return (
		<>
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
		</>
	);
}
