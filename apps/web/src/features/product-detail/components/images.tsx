"use client";

import type { IImage } from "@/types/api";
import Image from "next/image";
import { useState } from "react";
import type { IProductWithRelations } from "../types";
import { cn } from "@/lib/utils";

export default function Images({
	images,
	product,
}: {
	images: IImage[];
	product: IProductWithRelations;
}) {
	const [selectedImage, setSelectedImage] = useState<IImage>(images[0]);

	return (
		<div className="grid gap-4 lg:grid-cols-6">
			{/* Thumbnails */}
			<div className="order-2 grid grid-cols-5 gap-3 lg:order-1 lg:flex lg:flex-col lg:gap-4">
				{images.map((img) => {
					const isActive = selectedImage?.url === img.url;

					return (
						<button
							key={img.url}
							type="button"
							onClick={() => setSelectedImage(img)}
							className={cn(
								"relative aspect-square overflow-hidden rounded-md border transition",
								"hover:ring-2 hover:ring-primary",
								isActive && "ring-2 ring-primary",
							)}
						>
							<Image
								src={img.url}
								alt={product.name}
								fill
								className="object-cover"
							/>
						</button>
					);
				})}
			</div>

			{/* Main Image */}
			<div className="order-1 lg:order-2 lg:col-span-5">
				<div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
					<Image
						src={selectedImage.url}
						alt={product.name}
						fill
						className="object-cover"
						priority
					/>
				</div>
			</div>
		</div>
	);
}
