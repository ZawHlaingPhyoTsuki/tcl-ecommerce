import { getCategories } from "@/features/home/api/category";
import BestSellingStoreSection from "@/features/home/components/best-selling-store-section";
import CategorySection from "@/features/home/components/category-section";
import HeroSection from "@/features/home/components/hero-section";
import SellerSection from "@/features/home/components/seller-section";

export default async function Home() {
	const categories = await getCategories();

	console.log({ categories });

	return (
		<div className="container mx-auto max-w-7xl px-4 py-2">
			<HeroSection />

			<CategorySection categories={categories.data} />

			<SellerSection />

			<BestSellingStoreSection />
		</div>
	);
}
