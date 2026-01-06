import {
	parseAsArrayOf,
	parseAsBoolean,
	parseAsInteger,
	parseAsString,
	parseAsStringLiteral,
} from "nuqs/server";

export const filterSearchParams = {
	page: parseAsInteger.withDefault(1),
	limit: parseAsInteger.withDefault(12),

	search: parseAsString.withDefault(""),

	minPrice: parseAsInteger.withDefault(0),
	maxPrice: parseAsInteger.withDefault(10000),
	category: parseAsArrayOf(parseAsString).withDefault([]),
	sellerId: parseAsString.withDefault(""),
	inStock: parseAsBoolean.withDefault(false),
	currency: parseAsStringLiteral(["BAHT", "KYAT"]).withDefault("BAHT"),

	sortBy: parseAsStringLiteral([
		"price-asc",
		"price-desc",
		"name-asc",
		"name-desc",
		"newest",
	]).withDefault("newest"),
};
