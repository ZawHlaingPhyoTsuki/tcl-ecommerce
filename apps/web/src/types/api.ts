export interface IApiResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

export interface IPagination {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
	nextPage: number | null;
	prevPage: number | null;
}

export interface IProduct {
	id: string;
	name: string;
	slug: string;
	description: string;
	price: number;
	currency: string;
	stock: number;
	categoryId: string;
	sellerId: string;
	archivedAt: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface IReview {
	id: string;
	rating: number;
	userId: string;
	productId: string;
	comment: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface IUser {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	image: string | null;
	imagePublicId: string | null;
	role: UserRole;
	createdAt: string;
	updatedAt: string;
}

export interface ISeller {
	id: string;
	slug: string;
	userId: string;
	shopName: string;
	bio: string | null;
	phone: string | null;
	address: string | null;
	city: string | null;
	status: SellerStatus;
	createdAt: string;
	updatedAt: string;
}

export interface ICategory {
	id: string;
	slug: string;
	name: string;
	imageUrl: string;
	imageWidth: number;
	imageHeight: number;
	createdAt: string;
	updatedAt: string;
}

export interface IImage {
	url: string;
	width: number;
	height: number;
}

export type SellerStatus = "PENDING" | "APPROVED" | "REJECTED";

export type UserRole = "ADMIN" | "SELLER" | "CUSTOMER";
