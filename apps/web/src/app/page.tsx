import { Footer } from "@/components/footer";
import { getCategories } from "@/features/home/api/get-category";
import BestSellingStoreSection from "@/features/home/components/best-selling-store-section";
import CategorySection from "@/features/home/components/category-section";
import HeroSection from "@/features/home/components/hero-section";
import SellerSection from "@/features/home/components/seller-section";

export default async function Home() {
	const categories = await getCategories();

	if (!categories.success) {
		return <div>Failed to load categories</div>;
	}

	return (
		<>
			<main className="container mx-auto max-w-7xl px-4 py-6 md:py-10">
				<div className="mb-10 flex flex-col gap-8 md:gap-1">
					<HeroSection />

					<CategorySection categories={categories.data} />

					<SellerSection sellers={categories.data} />

					<BestSellingStoreSection />
				</div>
			</main>

			<Footer />
		</>
	);
}
