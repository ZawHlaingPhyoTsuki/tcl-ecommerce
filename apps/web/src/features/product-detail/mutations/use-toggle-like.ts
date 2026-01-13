import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toggleLike } from "../api/toggle-like";
import type { IProductWithRelations } from "../types";

export const useToggleLike = (productId: string, slug: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => toggleLike(productId),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ["product", slug] });

			const previousProduct = queryClient.getQueryData<IProductWithRelations>([
				"product",
				slug,
			]);

			if (previousProduct) {
				queryClient.setQueryData<IProductWithRelations>(["product", slug], {
					...previousProduct,
					likes: {
						count: previousProduct.likes.userLiked
							? previousProduct.likes.count - 1
							: previousProduct.likes.count + 1,
						userLiked: !previousProduct.likes.userLiked,
					},
				});
			}

			return { previousProduct };
		},
		onError: (err, _variables, context) => {
			if (context?.previousProduct) {
				queryClient.setQueryData(["product", slug], context.previousProduct);
			}
			toast.error(err instanceof Error ? err.message : "Failed to toggle like");
		},
	});
};
