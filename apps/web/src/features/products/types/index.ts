export interface Product {
	id: string;
	name: string;
	slug: string;
	description: string;
	price: number;
	currency: string;
	stock: number;
	images: { url: string }[];
	category: { name: string; slug: string };
	seller: { shopName: string };
	createdAt: string;
	updatedAt: string;
}

export interface ProductFilters {
	search: string;
	category: string[];
	minPrice: number;
	maxPrice: number;
	inStock: boolean;
	sortBy: "price-asc" | "price-desc" | "name-asc" | "name-desc" | "newest";
}
