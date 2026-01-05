export const paginationMetadata = (
	page: number,
	limit: number,
	total: number,
) => {
	if (limit <= 0) {
		throw new Error("Limit must be greater than 0");
	}

	if (page < 1) {
		throw new Error("Page must be at least 1");
	}

	if (total < 0) {
		throw new Error("Total must be greater than or equal to 0");
	}

	const totalPages = Math.ceil(total / limit);
	const hasNextPage = page < totalPages;
	const hasPrevPage = page > 1;

	return {
		page,
		limit,
		total,
		totalPages,
		hasNextPage,
		hasPrevPage,
		nextPage: hasNextPage ? page + 1 : null,
		prevPage: hasPrevPage ? page - 1 : null,
	};
};
