"use client";

import { ThumbsUpIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useToggleLike } from "../../mutations/use-toggle-like";

interface LikeButtonProps {
	productId: string;
	slug: string;
	initialLiked: boolean;
}

export default function LikeButton({
	productId,
	slug,
	initialLiked: isLiked,
}: LikeButtonProps) {
	console.log({ isLiked });

	const { data: session } = authClient.useSession();

	const mutation = useToggleLike(productId, slug);

	const handleToggle = () => {
		if (!session) {
			toast.error("Please sign in to like products");
			return;
		}
		mutation.mutate();
	};

	return (
		<Button
			size="lg"
			className="flex-1"
			onClick={handleToggle}
			disabled={mutation.isPending}
		>
			<ThumbsUpIcon className={cn("h-4 w-4", isLiked && "fill-current")} />
			{isLiked ? "Liked" : "Like"}
		</Button>
	);
}
