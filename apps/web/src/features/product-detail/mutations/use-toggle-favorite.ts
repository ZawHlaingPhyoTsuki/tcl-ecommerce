import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toggleFavorite } from "../api/toggle-favorite";
import type { IProductWithRelations } from "../types";

export const useToggleFavorite = (productId: string, slug: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => toggleFavorite(productId),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ["product", slug] });

			const previousProduct = queryClient.getQueryData<IProductWithRelations>([
				"product",
				slug,
			]);

			if (previousProduct) {
				queryClient.setQueryData<IProductWithRelations>(["product", slug], {
					...previousProduct,
					favorites: {
						count: previousProduct.favorites.userFavorited
							? previousProduct.favorites.count - 1
							: previousProduct.favorites.count + 1,
						userFavorited: !previousProduct.favorites.userFavorited,
					},
				});
			}

			return { previousProduct };
		},
		onError: (err, _variables, context) => {
			if (context?.previousProduct) {
				queryClient.setQueryData(["product", slug], context.previousProduct);
			}
			toast.error(
				err instanceof Error ? err.message : "Failed to toggle favorite",
			);
		},
		onSuccess: (data) => {
			// Update with exact server response to ensure consistency
			queryClient.setQueryData<IProductWithRelations>(
				["product", slug],
				(old) => {
					if (!old) return old;

					return {
						...old,
						favorites: {
							count: data.count, // Use exact count from server
							userFavorited: data.favorited,
						},
					};
				},
			);
		},
	});
};
