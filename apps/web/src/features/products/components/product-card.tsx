import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Product } from "../types";

interface ProductCardProps {
	product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
	return (
		<Card className="overflow-hidden transition-shadow hover:shadow-lg">
			<div className="relative aspect-square bg-gray-100">
				{product.images[0] ? (
					<Image
						src={product.images[0].url}
						alt={product.name}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center text-gray-400">
						No image
					</div>
				)}
				<Badge className="absolute top-2 left-2">
					{product.stock > 0 ? "In Stock" : "Out of Stock"}
				</Badge>
			</div>

			<CardContent className="p-4">
				<div className="mb-2 flex items-start justify-between">
					<h3 className="line-clamp-2 font-semibold text-sm">{product.name}</h3>
					<div className="flex items-center text-gray-500 text-xs">
						<Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
						<span className="ml-1">4.5</span>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div>
						<p className="font-bold text-lg">
							{product.price.toLocaleString()} {product.currency}
						</p>
						{product.seller && (
							<p className="text-gray-500 text-xs">
								By {product.seller.shopName}
							</p>
						)}
					</div>
				</div>
			</CardContent>

			<CardFooter className="p-4 pt-0">
				<Button
					className="w-full"
					disabled={product.stock === 0}
					onClick={() => {
						/* Add to cart logic */
					}}
				>
					<ShoppingCart className="mr-2 h-4 w-4" />
					Add to Cart
				</Button>
			</CardFooter>
		</Card>
	);
}
