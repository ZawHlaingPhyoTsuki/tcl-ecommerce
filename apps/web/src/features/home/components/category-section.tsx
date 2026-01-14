"use client"

import Image from "next/image";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useGetCategories } from "../queries/use-categories";

export default function CategorySection() {

	const { data } = useGetCategories();

	if (!data?.success) {
		return <div>Failed to load categories</div>;
	}

	return (
		<div className="mt-4">
			<h2 className="mb-4 font-bold text-2xl tracking-tight">Categories</h2>
			<ScrollArea className="max-w-full rounded-2xl border bg-card">
				<div className="flex w-max gap-4 p-4 md:gap-6 md:p-6">
					{data.data.map((category) => (
						<Link
							key={category.id}
							href={`/products?category=${category.slug}`}
							className="group relative flex w-24 shrink-0 flex-col items-center gap-3 md:w-32"
						>
							{/* Image Container */}
							<div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted shadow-sm ring-1 ring-border transition-all duration-300 group-hover:shadow-md group-hover:ring-primary/20">
								{category.imageUrl ? (
									<Image
										src={category.imageUrl}
										alt={category.name}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-110"
										sizes="(max-width: 768px) 96px, 128px"
									/>
								) : (
									<div className="flex h-full w-full items-center justify-center bg-linear-to-br from-muted to-muted/50 text-muted-foreground text-xs">
										No Image
									</div>
								)}
								<div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							</div>

							{/* Category Name Below Image */}
							<div className="flex flex-col items-center">
								<span className="text-center font-semibold text-foreground text-sm leading-tight transition-colors group-hover:text-primary md:text-base">
									{category.name}
								</span>
							</div>
						</Link>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	);
}
