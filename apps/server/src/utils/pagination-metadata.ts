export const paginationMetadata = (
	page: number,
	limit: number,
	total: number,
) => {
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
