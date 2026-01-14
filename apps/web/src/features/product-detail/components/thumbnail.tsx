import {
	CalendarIcon,
	MapPinIcon,
	ShoppingCartIcon,
	UserPlusIcon,
	UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { IProductWithRelations } from "../types";
import Images from "./images";

interface ThumbnailProps {
	product: IProductWithRelations;
	className?: string;
}

export default function Thumbnail({ product, className }: ThumbnailProps) {
	const images = product.images;

	if (!images.length) {
		return (
			<div className={cn("flex flex-col gap-6", className)}>
				<div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border bg-muted">
					<p className="text-muted-foreground">No images available</p>
				</div>
			</div>
		);
	}

	return (
		<div className={cn("flex flex-col gap-6", className)}>
			{/* Images */}
			<Images images={images} product={product} />

			{/* Seller Card */}
			<Card>
				<CardHeader className="flex flex-row items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<Avatar className="h-12 w-12">
							<AvatarImage
								src={
									product.seller.user.image || "https://github.com/shadcn.png"
								}
							/>
							<AvatarFallback>{product.seller.shopName[0]}</AvatarFallback>
						</Avatar>

						<div>
							<p className="font-semibold">{product.seller.shopName}</p>
							<p className="text-muted-foreground text-sm">Verified Seller</p>
						</div>
					</div>

					<div className="flex flex-col gap-2 sm:flex-row">
						<Button variant="outline">
							<UserPlusIcon className="h-4 w-4" /> Follow
						</Button>
						<Link href={`/sellers/${product.seller.slug}`}>
							<Button variant="outline">
								<ShoppingCartIcon className="h-4 w-4" />
								Visit Store
							</Button>
						</Link>
					</div>
				</CardHeader>

				<CardContent className="flex items-center justify-between gap-4 text-muted-foreground text-sm">
					<div className="flex items-center gap-2">
						<UsersIcon className="h-4 w-4 text-primary" />
						<p>
							Followers:{" "}
							<span className="font-semibold text-foreground">123</span>
						</p>
					</div>

					<div className="flex items-center gap-2">
						<MapPinIcon className="h-4 w-4 text-primary" />
						<p>
							City:{" "}
							<span className="font-semibold text-foreground">
								{product.seller.city || "Unknown"}
							</span>
						</p>
					</div>

					<div className="flex items-center gap-2">
						<CalendarIcon className="h-4 w-4 text-primary" />
						<p>
							Member Since:{" "}
							<span className="font-semibold text-foreground">
								{new Date(product.seller.createdAt).getFullYear()}
							</span>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
