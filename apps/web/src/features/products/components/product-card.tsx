import { Eye, Heart, StarIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { IProductWithRelations } from "@/features/products/types";
import { ProgressiveImage } from "./image-loader";

interface ProductCardProps {
	product: IProductWithRelations;
}

export function ProductCard({ product }: ProductCardProps) {
	const isNew = true;
	const isOnSale = false;

	const imageUrl = product.images[0].url || "/placeholder.png";
	const ratio = (product.images[0].height / product.images[0].width) * 100;

	return (
		<Card className="group overflow-hidden py-0 transition-shadow duration-300 hover:shadow-lg">
			<div
				className="relative w-full overflow-hidden"
				style={{
					paddingBottom: `${ratio}%`,
				}}
			>
				{/* Product Image */}
				<ProgressiveImage
					src={imageUrl}
					alt={product.name}
					fill
					className="object-cover transition-transform duration-500 group-hover:scale-105"
				/>

				{/* Badges */}
				<div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
					{isNew && (
						<span className="rounded-full bg-blue-600 px-2 py-1 text-white text-xs">
							New
						</span>
					)}
					{isOnSale && (
						<span className="rounded-full bg-red-600 px-2 py-1 text-white text-xs">
							Sale
						</span>
					)}
				</div>

				{/* Quick Actions */}
				<div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
					<Button
						size="icon"
						className="h-8 w-8 rounded-full bg-white shadow-md hover:bg-white/90"
					>
						<Heart className="h-4 w-4" />
					</Button>
				</div>
			</div>

			<CardContent className="px-4">
				{/* Product Name */}
				<h3 className="mb-2 line-clamp-2 font-semibold text-lg">
					{product.name}
				</h3>

				{/* Category */}
				<p className="mb-1 text-muted-foreground text-sm">
					{product.category.name}
				</p>

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1">
						<StarIcon fill="white" className="h-4 w-4" />
						<div className="flex items-center gap-1">
							<span className="text-sm">{product.rating.average}</span>
							<span className="text-sm">({product.rating.count})</span>
						</div>
					</div>

					{/* Price */}
					<span className="font-bold text-xl">฿{product.price}</span>
				</div>
			</CardContent>

			<CardFooter className="p-4 pt-0">
				<Button
					className="w-full"
					render={<Link href={`/products/${product.id}`} />}
				>
					<Eye className="h-4 w-4" />
					View
				</Button>
			</CardFooter>
		</Card>
	);
}
