import type { ICategory, IImage, IProduct, ISeller } from "@/types/api";

export interface IProductWithRelations extends IProduct {
	images: IImage[];
	category: Pick<ICategory, "id" | "slug" | "name">;
	seller: Pick<ISeller, "id" | "shopName" | "slug" | "createdAt">;
	rating: {
		average: number;
		count: number;
	};
}
