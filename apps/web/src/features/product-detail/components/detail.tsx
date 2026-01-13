import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { IProductWithRelations } from "../types";
import ProductActions from "./action-button/product-actions";

interface DetailProps {
	product: IProductWithRelations;
	className?: string;
}

const currencyUtil = (currency: string) => {
	return (
		currency[0].toLocaleUpperCase() + currency.slice(1).toLocaleLowerCase()
	);
};

export default function Detail({ product, className }: DetailProps) {
	console.log({ product });

	return (
		<div className={cn("flex h-full flex-col space-y-5", className)}>
			{/* Title and Status Badges */}
			<div className="space-y-4">
				<h1 className="font-bold text-2xl leading-tight sm:text-3xl">
					{product.name}
				</h1>

				{/* Badge Group */}
				<div className="flex flex-wrap items-center gap-2">
					<Badge
						variant={product.stock > 10 ? "default" : "destructive"}
						className="px-3 py-1 text-sm"
					>
						{product.stock > 10
							? `${product.stock} in stock`
							: `Only ${product.stock} left`}
					</Badge>
					<Badge variant="outline" className="px-3 py-1 text-sm">
						{product.category.name}
					</Badge>
				</div>
			</div>

			{/* Price Section */}
			<span className="font-bold text-3xl text-primary sm:text-4xl">
				{currencyUtil(product.currency)} {product.price.toLocaleString()}
			</span>

			{/* Description */}
			<div className="space-y-3">
				<h3 className="font-semibold text-base sm:text-lg">
					Product Description
				</h3>
				<p className="text-muted-foreground text-sm leading-relaxed">
					{product.description}
				</p>
			</div>

			{/* Actions */}
			<div className="mt-auto space-y-5">
				<ProductActions product={product} />
			</div>
		</div>
	);
}
