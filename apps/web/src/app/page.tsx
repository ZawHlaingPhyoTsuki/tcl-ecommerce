"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

export default function Home() {
	const [categoryScrollPosition, setCategoryScrollPosition] = useState(0);
	const [sellerScrollPosition, setSellerScrollPosition] = useState(0);
	const categoryContainerRef = useRef<HTMLDivElement>(null);
	const sellerContainerRef = useRef<HTMLDivElement>(null);
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

	const scrollSellers = (direction: "left" | "right") => {
		if (!sellerContainerRef.current) return;

		const containerWidth = sellerContainerRef.current.clientWidth;
		const maxScroll = sellerContainerRef.current.scrollWidth - containerWidth;

		let newPosition = sellerScrollPosition;
		if (direction === "left") {
			newPosition = Math.max(0, sellerScrollPosition - ITEM_WIDTH * 3); // Scroll 3 items
		} else {
			newPosition = Math.min(maxScroll, sellerScrollPosition + ITEM_WIDTH * 3);
		}

		sellerContainerRef.current.scrollTo({
			left: newPosition,
			behavior: "smooth",
		});
		setSellerScrollPosition(newPosition);
	};

	const items = Array.from({ length: 30 });

	return (
		<div className="container mx-auto max-w-7xl px-4 py-2">
			<div className="h-100 w-full bg-muted">Hero Image Carousel</div>

			{/* Categories Section */}
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
						{items.map((_, index) => (
							<div
								key={index}
								className="flex h-32 w-32 shrink-0 items-center justify-center rounded-lg bg-muted font-medium text-white"
							>
								Category {index + 1}
							</div>
						))}
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

			{/* Sellers Section */}
			<div className="my-4">
				<h2 className="mb-3 font-semibold text-xl">Sellers</h2>

				<div className="relative">
					{/* Left Navigation Button */}
					<button
						type="button"
						onClick={() => scrollSellers("left")}
						disabled={sellerScrollPosition <= 0}
						className="absolute top-1/2 left-0 z-10 -translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg disabled:opacity-30"
					>
						<ChevronLeft className="h-5 w-5" />
					</button>

					{/* Scrollable Container */}
					<div
						ref={sellerContainerRef}
						className="scrollbar-hide flex max-h-80 flex-col flex-wrap gap-3 overflow-x-hidden" // Changed to hidden
					>
						{items.map((_, index) => (
							<div
								key={index}
								className="flex h-32 w-32 shrink-0 items-center justify-center rounded-lg bg-muted font-medium text-white"
							>
								Seller {index + 1}
							</div>
						))}
					</div>

					{/* Right Navigation Button */}
					<button
						type="button"
						onClick={() => scrollSellers("right")}
						className="absolute top-1/2 right-0 z-10 translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
					>
						<ChevronRight className="h-5 w-5" />
					</button>
				</div>
			</div>

			<div className="mt-4">
				<h2 className="mb-3 font-semibold text-xl">Best Selling Store</h2>
				<div className="grid grid-cols-3 gap-3">
					<div className="col-span-1 w-full rounded-xl bg-muted">Image</div>
					<div className="col-span-2">
						<div className="grid w-full grid-cols-2 gap-2 rounded-xl">
							<BestSellingStoreCard />
							<BestSellingStoreCard />
							<BestSellingStoreCard />
							<BestSellingStoreCard />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function BestSellingStoreCard() {
	return (
		<div className="flex flex-col gap-4 rounded-xl border-2 border-accent p-4">
			{/* Upper */}
			<div className="flex items-center gap-4">
				<div className="h-16 w-16 rounded-full bg-muted" />
				<div>
					<div className="font-semibold">Shope Name</div>
					<div>"some bio"</div>
				</div>
			</div>
			{/* Lower */}
			<div className="grid grid-cols-3 gap-2">
				<div className="flex flex-col items-center">
					<div className="h-24 w-full rounded-lg bg-muted text-center">
						Image
					</div>
					<div>Price</div>
				</div>
				<div className="flex flex-col items-center">
					<div className="h-24 w-full rounded-lg bg-muted text-center">
						Image
					</div>
					<div>Price</div>
				</div>
				<div className="flex flex-col items-center">
					<div className="h-24 w-full rounded-lg bg-muted text-center">
						Image
					</div>
					<div>Price</div>
				</div>
			</div>
		</div>
	);
}
