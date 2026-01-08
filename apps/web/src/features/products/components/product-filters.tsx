"use client";

import { SearchIcon } from "lucide-react";
// import {
// 	NumberField,
// 	NumberFieldDecrement,
// 	NumberFieldGroup,
// 	NumberFieldIncrement,
// 	NumberFieldInput,
// } from "@/components/ui/number-field";
// import {
// 	Select,
// 	SelectItem,
// 	SelectPopup,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
// import { Spinner } from "@/components/ui/spinner";
import { debounce } from "nuqs";
import { useFilters } from "@/app/(site)/products/search-params";
import { Button } from "@/components/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

// const categories = [
// 	{ id: "electronics", name: "Electronics" },
// 	{ id: "clothing", name: "Clothing" },
// 	{ id: "books", name: "Books" },
// 	{ id: "home", name: "Home & Kitchen" },
// 	{ id: "sports", name: "Sports" },
// ];

// const sortOptions = [
// 	{ label: "Newest First", value: "newest" },
// 	{ label: "Price: Low to High", value: "price-asc" },
// 	{ label: "Price: High to Low", value: "price-desc" },
// 	{ label: "Name: A to Z", value: "name-asc" },
// 	{ label: "Name: Z to A", value: "name-desc" },
// ];

interface ProductFiltersProps {
	className?: string;
}

export function ProductFilters({ className }: ProductFiltersProps) {
	const [filters, setFilters] = useFilters();

	const onClear = () => {
		setFilters({
			search: null,
			category: null,
			minPrice: null,
			maxPrice: null,
			inStock: null,
			sortBy: "newest",
		});
	};

	return (
		<div className={cn("space-y-6 py-4", className)}>
			<h3 className="font-semibold text-lg">Filter</h3>

			<InputGroup>
				<InputGroupInput
					placeholder="Search..."
					value={filters.search}
					onChange={(e) =>
						setFilters(
							{ search: e.target.value },
							{
								limitUrlUpdates:
									e.target.value === "" ? undefined : debounce(500),
							},
						)
					}
				/>
				<InputGroupAddon>
					<SearchIcon />
				</InputGroupAddon>
			</InputGroup>

			{/* 
			<div className="space-y-2">
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
				<div className="flex flex-col items-center space-y-2">
					<div className="flex flex-col items-start gap-2">
						<Label htmlFor="minPrice">Min Price</Label>
						<NumberField
							value={filters.minPrice}
							onValueChange={(value) => {
								// Handle null case by falling back to 0
								const minValue = value ?? 0;
								updateFilters({ minPrice: minValue });
							}}
							id="minPrice"
							min={0}
							max={filters.maxPrice}
						>
							<NumberFieldGroup>
								<NumberFieldDecrement />
								<NumberFieldInput />
								<NumberFieldIncrement />
							</NumberFieldGroup>
						</NumberField>
					</div>
					<div className="flex flex-col items-start gap-2">
						<Label htmlFor="maxPrice">Max Price</Label>
						<NumberField
							value={filters.maxPrice}
							onValueChange={(value) => {
								// Handle null case by falling back to 0
								const minValue = value ?? 0;
								updateFilters({ maxPrice: minValue });
							}}
							id="maxPrice"
							min={filters.minPrice}
							max={10000}
						>
							<NumberFieldGroup>
								<NumberFieldDecrement />
								<NumberFieldInput />
								<NumberFieldIncrement />
							</NumberFieldGroup>
						</NumberField>
					</div>
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
					items={sortOptions}
					value={
						filters.sortBy as
							| "newest"
							| "price-asc"
							| "price-desc"
							| "name-asc"
							| "name-desc"
					}
					onValueChange={(value) => {
						updateFilters({
							sortBy: value as
								| "newest"
								| "price-asc"
								| "price-desc"
								| "name-asc"
								| "name-desc",
						});
					}}
				>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectPopup alignItemWithTrigger={false}>
						{sortOptions.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectPopup>
				</Select>
			</div> */}

			<Button onClick={onClear}>Clear</Button>
		</div>
	);
}
