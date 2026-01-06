"use client";

import { FilterX, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useProductFilters } from "../hooks/use-product-filters";

const categories = [
	{ id: "electronics", name: "Electronics" },
	{ id: "clothing", name: "Clothing" },
	{ id: "books", name: "Books" },
	{ id: "home", name: "Home & Kitchen" },
	{ id: "sports", name: "Sports" },
];

export function ProductFilters() {
	const { filters, updateFilters, resetFilters } = useProductFilters();

	return (
		<div className="space-y-6">
			<div>
				<Label htmlFor="search" className="mb-2 flex items-center gap-2">
					<Search className="h-4 w-4" />
					Search Products
				</Label>
				<Input
					id="search"
					placeholder="Search..."
					value={filters.search}
					onChange={(e) => updateFilters({ search: e.target.value })}
				/>
			</div>

			<div>
				<Label className="mb-3 block">Categories</Label>
				<div className="space-y-2">
					{categories.map((cat) => (
						<div key={cat.id} className="flex items-center space-x-2">
							<Checkbox
								id={`cat-${cat.id}`}
								checked={filters.category.includes(cat.id)}
								onCheckedChange={(checked) => {
									const newCategories = checked
										? [...filters.category, cat.id]
										: filters.category.filter((c: string) => c !== cat.id);
									updateFilters({ category: newCategories });
								}}
							/>
							<Label
								htmlFor={`cat-${cat.id}`}
								className="cursor-pointer text-sm"
							>
								{cat.name}
							</Label>
						</div>
					))}
				</div>
			</div>

			<div>
				<Label className="mb-3 block">Price Range</Label>
				<Slider
					value={[filters.minPrice, filters.maxPrice] as [number, number]}
					min={0}
					max={10000}
					step={100}
					onValueChange={(value) => {
						const [min, max] = value as [number, number];
						updateFilters({ minPrice: min, maxPrice: max });
					}}
					className="my-4"
				/>
				<div className="flex justify-between text-gray-600 text-sm">
					<span>{filters.minPrice.toLocaleString()} BAHT</span>
					<span>{filters.maxPrice.toLocaleString()} BAHT</span>
				</div>
			</div>

			<div className="flex items-center space-x-2">
				<Checkbox
					id="inStock"
					checked={filters.inStock}
					onCheckedChange={(checked) => updateFilters({ inStock: !!checked })}
				/>
				<Label htmlFor="inStock" className="cursor-pointer text-sm">
					In Stock Only
				</Label>
			</div>

			<div>
				<Label className="mb-2 block">Sort By</Label>
				<Select
					value={filters.sortBy}
					onValueChange={(
						value:
							| "price-asc"
							| "price-desc"
							| "name-asc"
							| "name-desc"
							| "newest"
							| null,
					) => {
						if (value) {
							updateFilters({ sortBy: value });
						} else {
							updateFilters({ sortBy: "newest" });
						}
					}}
				>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="newest">Newest First</SelectItem>
							<SelectItem value="price-asc">Price: Low to High</SelectItem>
							<SelectItem value="price-desc">Price: High to Low</SelectItem>
							<SelectItem value="name-asc">Name: A to Z</SelectItem>
							<SelectItem value="name-desc">Name: Z to A</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<Button variant="outline" className="w-full" onClick={resetFilters}>
				<FilterX className="mr-2 h-4 w-4" />
				Clear All Filters
			</Button>
		</div>
	);
}
