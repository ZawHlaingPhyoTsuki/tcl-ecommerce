import { faker } from "@faker-js/faker";
import prisma, { Role, SellerStatus } from "@tcl-ecommerce/db";

async function main() {
	console.log("🌱 Starting seed...");

	// 1. Cleanup
	console.log("Cleaning up existing data...");
	// Delete in order to avoid foreign key constraints
	await prisma.review.deleteMany();
	await prisma.favorite.deleteMany();
	await prisma.product.deleteMany();
	await prisma.category.deleteMany();
	await prisma.seller.deleteMany();
	await prisma.account.deleteMany();
	await prisma.session.deleteMany();
	await prisma.user.deleteMany();

	// 2. Create Users
	console.log("Creating users...");

	// Seller
	const sellerUser = await prisma.user.create({
		data: {
			id: faker.string.uuid(),
			name: "Seller One",
			email: "seller@example.com",
			emailVerified: true,
			image: faker.image.avatar(),
			role: Role.SELLER,
		},
	});

	// Seller Profile
	const seller = await prisma.seller.create({
		data: {
			shopName: "Tachileik Official Store",
			slug: "tachileik-official",
			bio: faker.company.catchPhrase(),
			phone: faker.phone.number(),
			address: faker.location.streetAddress(),
			status: SellerStatus.APPROVED,
			userId: sellerUser.id,
		},
	});

	// Customers
	const customers = [];
	for (let i = 0; i < 5; i++) {
		const customer = await prisma.user.create({
			data: {
				id: faker.string.uuid(),
				name: faker.person.fullName(),
				email: faker.internet.email(),
				emailVerified: true,
				image: faker.image.avatar(),
				role: Role.CUSTOMER,
			},
		});
		customers.push(customer);
	}

	// 3. Create Categories
	console.log("Creating categories...");
	const categories = [];
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

	for (const name of categoryNames) {
		const category = await prisma.category.create({
			data: {
				name,
				slug: faker.helpers.slugify(name).toLowerCase(),
				imageUrl: faker.image.urlPicsumPhotos({
					width: faker.number.int({ min: 300, max: 500 }),
					height: faker.number.int({ min: 300, max: 500 }),
				}),
				imageWidth: faker.number.int({ min: 300, max: 500 }),
				imageHeight: faker.number.int({ min: 300, max: 500 }),
			},
		});
		categories.push(category);
	}

	// 4. Create Products
	console.log("Creating products...");
	const products = [];
	for (let i = 0; i < 20; i++) {
		const category = faker.helpers.arrayElement(categories);
		const name = faker.commerce.productName();

		// Ensure unique slug
		let slug = faker.helpers.slugify(name).toLowerCase();
		const existingSlug = await prisma.product.findUnique({ where: { slug } });
		if (existingSlug) {
			slug = `${slug}-${faker.string.alphanumeric(4)}`;
		}

		const product = await prisma.product.create({
			data: {
				name,
				slug,
				description: faker.commerce.productDescription(),
				price: Number.parseFloat(
					faker.commerce.price({ min: 100, max: 10000 }),
				),
				stock: faker.number.int({ min: 0, max: 100 }),
				categoryId: category.id,
				sellerId: seller.id,
				images: {
					create: [
						{
							url: faker.image.urlPicsumPhotos({
								width: faker.number.int({ min: 300, max: 500 }),
								height: faker.number.int({ min: 300, max: 500 }),
							}),
							publicId: `${faker.string.uuid()}-${faker.lorem.word()}`,
							width: faker.number.int({ min: 300, max: 500 }),
							height: faker.number.int({ min: 300, max: 500 }),
						},
						{
							url: faker.image.urlPicsumPhotos({
								width: faker.number.int({ min: 300, max: 500 }),
								height: faker.number.int({ min: 300, max: 500 }),
							}),
							publicId: `${faker.string.uuid()}-${faker.lorem.word()}`,
							width: faker.number.int({ min: 300, max: 500 }),
							height: faker.number.int({ min: 300, max: 500 }),
						},
					],
				},
			},
		});
		products.push(product);
	}

	// 5. Create Reviews & Favorites
	console.log("Creating reviews and favorites...");
	for (const product of products) {
		// Randomly add reviews
		const reviewCount = faker.number.int({ min: 0, max: 3 });
		for (let i = 0; i < reviewCount; i++) {
			const reviewer = faker.helpers.arrayElement(customers);
			// Check if already reviewed to avoid unique constraint error
			const existingReview = await prisma.review.findUnique({
				where: {
					userId_productId: {
						userId: reviewer.id,
						productId: product.id,
					},
				},
			});

			if (!existingReview) {
				await prisma.review.create({
					data: {
						rating: faker.number.int({ min: 1, max: 5 }),
						comment: faker.lorem.sentence(),
						userId: reviewer.id,
						productId: product.id,
					},
				});
			}
		}

		// Randomly add favorites
		const favCount = faker.number.int({ min: 0, max: 2 });
		for (let i = 0; i < favCount; i++) {
			const user = faker.helpers.arrayElement(customers);
			// Check if already favorited
			const existingFav = await prisma.favorite.findUnique({
				where: {
					userId_productId: {
						userId: user.id,
						productId: product.id,
					},
				},
			});

			if (!existingFav) {
				await prisma.favorite.create({
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
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
