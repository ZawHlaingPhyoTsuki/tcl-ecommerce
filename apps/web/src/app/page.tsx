import { getCategories } from "@/features/home/api/category";
import BestSellingStoreSection from "@/features/home/components/best-selling-store-section";
import CategorySection from "@/features/home/components/category-section";
import HeroSection from "@/features/home/components/hero-section";
import SellerSection from "@/features/home/components/seller-section";

export default async function Home() {
	const categories = await getCategories();

	if (!categories.success) {
		console.error("Failed to fetch categories:", categories.message);
		return <div>Failed to load categories</div>;
	}

	return (
		<div className="container mx-auto max-w-7xl px-4 py-6 md:py-10">
			<div className="flex flex-col gap-8 md:gap-12">
				<HeroSection />

				<CategorySection
					categories={categories.success ? categories.data : []}
				/>

				<SellerSection sellers={categories.success ? categories.data : []} />

				<BestSellingStoreSection />
			</div>
		</div>
	);
}
