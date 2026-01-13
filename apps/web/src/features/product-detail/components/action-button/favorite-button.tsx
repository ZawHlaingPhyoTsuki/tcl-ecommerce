"use client";

import { BookmarkIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useToggleFavorite } from "../../mutations/use-toggle-favorite";

interface FavoriteButtonProps {
	productId: string;
	slug: string;
	initialFavorite: boolean;
}

export default function FavoriteButton({
	productId,
	slug,
	initialFavorite: isFavorited,
}: FavoriteButtonProps) {
	const { data: session } = authClient.useSession();

	const mutation = useToggleFavorite(productId, slug);

	const handleToggle = () => {
		if (!session) {
			toast.error("Please sign in to save products");
			return;
		}
		mutation.mutate();
	};

	return (
		<Button
			size="lg"
			variant="outline"
			className="flex-1"
			onClick={handleToggle}
			disabled={mutation.isPending}
		>
			<BookmarkIcon
				className={cn("h-4 w-4", isFavorited && "fill-primary text-primary")}
			/>
			{isFavorited ? "Saved" : "Save"}
		</Button>
	);
}
