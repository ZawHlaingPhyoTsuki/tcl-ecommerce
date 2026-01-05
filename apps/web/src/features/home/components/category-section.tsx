"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Category } from "../types";

interface CategorySectionProps {
	categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
	const [categoryScrollPosition, setCategoryScrollPosition] = useState(0);
	const categoryContainerRef = useRef<HTMLDivElement>(null);

	const ITEM_WIDTH = 140; // w-32 + gap = 128px + 12px

	const scrollCategories = (direction: "left" | "right") => {
		if (!categoryContainerRef.current) return;

		const containerWidth = categoryContainerRef.current.clientWidth;
		const maxScroll = categoryContainerRef.current.scrollWidth - containerWidth;

		let newPosition = categoryScrollPosition;
		if (direction === "left") {
			newPosition = Math.max(0, categoryScrollPosition - ITEM_WIDTH * 3); // Scroll 3 items
		} else {
			newPosition = Math.min(
				maxScroll,
				categoryScrollPosition + ITEM_WIDTH * 3,
			);
		}

		categoryContainerRef.current.scrollTo({
			left: newPosition,
			behavior: "smooth",
		});
		setCategoryScrollPosition(newPosition);
	};

	return (
		<div className="mt-4">
			<h2 className="mb-3 font-semibold text-xl">Categories</h2>

			<div className="relative">
				{/* Left Navigation Button */}
				<button
					type="button"
					onClick={() => scrollCategories("left")}
					disabled={categoryScrollPosition <= 0}
					className="absolute top-1/2 left-0 z-10 -translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg disabled:opacity-30"
				>
					<ChevronLeft className="h-5 w-5" />
				</button>

				{/* Scrollable Container */}
				<div
					ref={categoryContainerRef}
					className="scrollbar-hide flex max-h-80 flex-col flex-wrap gap-3 overflow-x-hidden"
				>
					{categories.length > 0 ? (
						categories.map((category) => (
							<Link
								key={category.id}
								href={`/products?category=${category.slug}`}
								className="group relative flex h-40 w-32 shrink-0 flex-col items-center gap-2"
							>
								{/* Image Container */}
								<div className="relative h-32 w-32 overflow-hidden rounded-lg bg-gray-100">
									{category.imageUrl ? (
										<Image
											src={category.imageUrl}
											alt={category.name}
											fill
											className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
											sizes="(max-width: 768px) 128px, 128px"
										/>
									) : (
										<div className="flex h-full w-full items-center justify-center rounded-lg bg-linear-to-br from-gray-200 to-gray-300">
											No Image
										</div>
									)}
									{/* Optional overlay for better text readability */}
									<div className="absolute inset-0 rounded-lg bg-linear-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
								</div>

								{/* Category Name Below Image */}
								<div className="flex flex-col items-center">
									<span className="text-center font-medium">
										{category.name}
									</span>
									{/* Optional: Product count badge */}
									{/* {category._count?.products !== undefined && (
										<span className="text-xs text-gray-500">
											{category._count.products} products
										</span>
									)} */}
								</div>
							</Link>
						))
					) : (
						<div className="flex h-40 w-full items-center justify-center text-gray-500">
							No categories found
						</div>
					)}
				</div>

				{/* Right Navigation Button */}
				<button
					type="button"
					onClick={() => scrollCategories("right")}
					className="absolute top-1/2 right-0 z-10 translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
				>
					<ChevronRight className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
}
