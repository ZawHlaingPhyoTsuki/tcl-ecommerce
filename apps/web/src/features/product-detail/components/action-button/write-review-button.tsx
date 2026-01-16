"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PencilLineIcon, Star } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useCreateReview } from "../../mutations/use-create-review";
import { CreateReviewSchema, type CreateReviewType } from "../../types";

type Props = {
	productId: string;
};

export default function WriteReviewButton({ productId }: Props) {
	const [open, setOpen] = useState(false);
	const createReviewMutation = useCreateReview(productId);
	const { data: session, isPending: sessionPending } = authClient.useSession();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		reset,
	} = useForm<CreateReviewType>({
		resolver: zodResolver(CreateReviewSchema),
		defaultValues: {
			rating: 0,
			comment: "",
		},
	});

	const ratingValue = watch("rating");

	const handleOpenChange = (isOpen: boolean) => {
		if (isOpen && !session) {
			toast.error("Please sign in to write a review");
			return;
		}
		setOpen(isOpen);
	};

	const onSubmit = async (data: CreateReviewType) => {
		if (!session) {
			toast.error("Please sign in to write a review");
			return;
		}

		await createReviewMutation.mutateAsync(data);
		reset();
		setOpen(false);
	};

	if (sessionPending) {
		return (
			<Button variant="ghost" size="lg" className="flex-1 gap-2" disabled>
				<PencilLineIcon className="h-4 w-4" />
				Write Review
			</Button>
		);
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant="ghost" size="lg" className="flex-1 gap-2">
					<PencilLineIcon className="h-4 w-4" />
					Write Review
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Write a Review</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{/* ⭐ Rating */}
					<div className="space-y-2">
						<p className="font-medium text-sm">Rating</p>

						<div className="flex gap-2">
							{[1, 2, 3, 4, 5].map((star) => (
								<button
									key={star}
									type="button"
									onClick={() => setValue("rating", star)}
									className={cn(
										"cursor-pointer rounded-md border border-muted p-2 transition",
										ratingValue >= star
											? "bg-primary/5"
											: "border-muted hover:border-muted-foreground/50",
									)}
									aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
								>
									<div className="flex items-center gap-1">
										<Star
											fill={ratingValue >= star ? "orange" : "none"}
											stroke={ratingValue >= star ? "orange" : "currentColor"}
											className="h-4 w-4"
										/>
										<span className="text-sm">{star}</span>
									</div>
								</button>
							))}
						</div>

						{errors.rating && (
							<p className="text-destructive text-xs">
								{errors.rating.message}
							</p>
						)}
					</div>

					{/* 💬 Comment */}
					<div className="space-y-2">
						<p className="font-medium text-sm">Comment (optional)</p>
						<Textarea
							placeholder="Write your experience..."
							{...register("comment")}
						/>
						{errors.comment && (
							<p className="text-destructive text-xs">
								{errors.comment.message}
							</p>
						)}
					</div>

					<DialogFooter>
						<Button type="submit" disabled={createReviewMutation.isPending}>
							{createReviewMutation.isPending
								? "Submitting..."
								: "Submit Review"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
