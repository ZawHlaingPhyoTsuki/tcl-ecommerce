import { faker } from "@faker-js/faker";
import prisma, { SellerStatus, UserRole } from "@tcl-ecommerce/db";

async function main() {
	console.log("🌱 Starting seed...");

	// --------------------
	// CLEANUP
	// --------------------
	console.log("🧹 Cleaning up existing data...");

	await prisma.review.deleteMany();
	await prisma.like.deleteMany();
	await prisma.favorite.deleteMany();
	await prisma.image.deleteMany();
	await prisma.product.deleteMany();
	await prisma.category.deleteMany();
	await prisma.seller.deleteMany();
	await prisma.account.deleteMany();
	await prisma.session.deleteMany();
	await prisma.user.deleteMany();

	// --------------------
	// USERS
	// --------------------
	console.log("👤 Creating users...");

	const sellerUser = await prisma.user.create({
		data: {
			id: faker.string.uuid(),
			name: "Seller One",
			email: "seller@example.com",
			emailVerified: true,
			image: faker.image.avatar(),
			role: UserRole.SELLER,
		},
	});

	const seller = await prisma.seller.create({
		data: {
			shopName: "Tachileik Official Store",
			slug: "tachileik-official",
			bio: faker.company.catchPhrase(),
			phone: faker.phone.number(),
			address: faker.location.streetAddress(),
			city: faker.location.city(),
			status: SellerStatus.APPROVED,
			userId: sellerUser.id,
		},
	});

	const customers = [];

	for (let i = 0; i < 8; i++) {
		const customer = await prisma.user.create({
			data: {
				id: faker.string.uuid(),
				name: faker.person.fullName(),
				email: faker.internet.email(),
				emailVerified: true,
				image: faker.image.avatar(),
				role: UserRole.CUSTOMER,
			},
		});
		customers.push(customer);
	}

	// --------------------
	// CATEGORIES
	// --------------------
	console.log("📦 Creating categories...");

	const categoryNames = [
		"Electronics",
		"Fashion",
		"Home & Living",
		"Health & Beauty",
		"Sports",
		"Toys",
		"Automotive",
		"Books",
		"Groceries",
		"Pets",
	];

	const categories = [];

	for (const name of categoryNames) {
		const category = await prisma.category.create({
			data: {
				name,
				slug: faker.helpers.slugify(name).toLowerCase(),
				imageUrl: faker.image.urlPicsumPhotos({
					width: 400,
					height: 400,
				}),
				imageWidth: 400,
				imageHeight: 400,
			},
		});
		categories.push(category);
	}

	// --------------------
	// PRODUCTS + IMAGES
	// --------------------
	console.log("🛍️ Creating products...");

	const products = [];
	const usedSlugs = new Set<string>();

	function uniqueSlug(name: string) {
		let slug = faker.helpers.slugify(name).toLowerCase();
		let attempts = 0;
		const maxAttempts = 100;
		while (usedSlugs.has(slug) && attempts < maxAttempts) {
			slug = `${slug}-${faker.string.alphanumeric(4).toLowerCase()}`;
			attempts++;
		}

		if (attempts === maxAttempts) {
			throw new Error(`Failed to generate unique slug for "${name}"`);
		}

		usedSlugs.add(slug);
		return slug;
	}

	for (let i = 0; i < 25; i++) {
		const category = faker.helpers.arrayElement(categories);
		const name = faker.commerce.productName();
		const slug = uniqueSlug(name);

		const width = faker.number.int({ min: 500, max: 1000 });
		const height = faker.number.int({ min: 500, max: 1000 });

		const product = await prisma.product.create({
			data: {
				name,
				slug,
				description: faker.commerce.productDescription(),
				price: Number(faker.commerce.price({ min: 100, max: 10000 })),
				stock: faker.number.int({ min: 0, max: 100 }),
				categoryId: category.id,
				sellerId: seller.id,
				images: {
					create: [
						{
							url: faker.image.urlPicsumPhotos({ width, height }),
							publicId: faker.string.uuid(),
							width,
							height,
						},
						{
							url: faker.image.urlPicsumPhotos({ width, height }),
							publicId: faker.string.uuid(),
							width,
							height,
						},
					],
				},
			},
		});

		products.push(product);
	}

	// --------------------
	// REVIEWS, FAVORITES, LIKES
	// --------------------
	console.log("⭐ Creating reviews, favorites, likes...");

	const reviewSet = new Set<string>();
	const favoriteSet = new Set<string>();
	const likeSet = new Set<string>();

	for (const product of products) {
		// Reviews
		const reviewCount = faker.number.int({ min: 0, max: 4 });

		for (let i = 0; i < reviewCount; i++) {
			const user = faker.helpers.arrayElement(customers);
			const key = `${user.id}-${product.id}`;

			if (!reviewSet.has(key)) {
				reviewSet.add(key);

				await prisma.review.create({
					data: {
						rating: faker.number.int({ min: 1, max: 5 }),
						comment: faker.lorem.sentence(),
						userId: user.id,
						productId: product.id,
					},
				});
			}
		}

		// Favorites
		const favCount = faker.number.int({ min: 0, max: 3 });

		for (let i = 0; i < favCount; i++) {
			const user = faker.helpers.arrayElement(customers);
			const key = `${user.id}-${product.id}`;

			if (!favoriteSet.has(key)) {
				favoriteSet.add(key);

				await prisma.favorite.create({
					data: {
						userId: user.id,
						productId: product.id,
					},
				});
			}
		}

		// Likes
		const likeCount = faker.number.int({ min: 0, max: 6 });

		for (let i = 0; i < likeCount; i++) {
			const user = faker.helpers.arrayElement(customers);
			const key = `${user.id}-${product.id}`;

			if (!likeSet.has(key)) {
				likeSet.add(key);

				await prisma.like.create({
					data: {
						userId: user.id,
						productId: product.id,
					},
				});
			}
		}
	}

	console.log("✅ Seed completed successfully!");
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error("❌ Seed failed:", e);
		await prisma.$disconnect();
		process.exit(1);
	});
