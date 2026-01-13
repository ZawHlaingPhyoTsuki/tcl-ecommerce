import { z } from "zod";
import type {
	ICategory,
	IImage,
	IProduct,
	IReview,
	ISeller,
	IUser,
} from "@/types/api";

export interface IProductWithRelations extends IProduct {
	images: IImage[];
	category: Pick<ICategory, "id" | "slug" | "name">;
	seller: Pick<ISeller, "id" | "shopName" | "slug" | "city" | "createdAt"> & {
		user: Pick<IUser, "image">;
	};
	likes: {
		count: number;
		userLiked: boolean;
	};
	favorites: {
		count: number;
		userFavorited: boolean;
	};
}

export interface IReviewStats {
	total: number;
	average: number;
	breakdown: {
		star: 5 | 4 | 3 | 2 | 1;
		count: number;
		percentage: number;
	}[];
}

export interface IReviewWithUser extends IReview {
	user: Pick<IUser, "name" | "image">;
}

export const CreateReviewSchema = z.object({
	rating: z.number().min(1, "Please select a rating").max(5),
	comment: z.string().optional(),
});

export type CreateReviewType = z.infer<typeof CreateReviewSchema>;
