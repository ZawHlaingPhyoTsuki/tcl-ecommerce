import type {
	ICategory,
	IImage,
	IPagination,
	IProduct,
	IReview,
	ISeller,
} from "@/types/api";

export interface IProductWithRelations extends IProduct {
	images: IImage[];
	category: Pick<ICategory, "id" | "slug" | "name">;
	seller: Pick<ISeller, "id" | "shopName" | "slug">;
	reviews: Pick<IReview, "id" | "rating">[];
	rating: {
		average: number;
		count: number;
	};
	favorited?: boolean;
}

export interface IProductsResponse {
	products: IProductWithRelations[];
	pagination: IPagination;
}
