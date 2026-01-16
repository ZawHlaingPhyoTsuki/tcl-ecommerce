export const reviewStarCount = (reviews: { rating: number }[]) => {
	const total = reviews.length;

	const starCount = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
	};

	for (const r of reviews) {
		const rating = r.rating;
		if (rating >= 1 && rating <= 5 && Number.isInteger(rating)) {
			starCount[rating as 1 | 2 | 3 | 4 | 5]++;
		}
	}

	const average =
		total === 0 ? 0 : reviews.reduce((sum, r) => sum + r.rating, 0) / total;

	const breakdown = [5, 4, 3, 2, 1].map((star) => ({
		star,
		count: starCount[star as 1 | 2 | 3 | 4 | 5],
		percentage:
			total === 0
				? 0
				: Math.round((starCount[star as 1 | 2 | 3 | 4 | 5] / total) * 100),
	}));

	return {
		total,
		average: Number(average.toFixed(1)),
		breakdown,
	};
};
