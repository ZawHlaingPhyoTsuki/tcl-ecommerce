"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

export default function SellerSection() {
	const [sellerScrollPosition, setSellerScrollPosition] = useState(0);
	const sellerContainerRef = useRef<HTMLDivElement>(null);

	const ITEM_WIDTH = 140; // w-32 + gap = 128px + 12px

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
	);
}
