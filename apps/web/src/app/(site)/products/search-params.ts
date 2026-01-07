import { useQueryStates } from "nuqs";
import {
	createLoader,
	type Options,
	parseAsArrayOf,
	parseAsBoolean,
	parseAsInteger,
	parseAsString,
	parseAsStringLiteral,
} from "nuqs/server";

const searchParams = {
	page: parseAsInteger.withDefault(1),
	limit: parseAsInteger.withDefault(12),

	search: parseAsString.withDefault(""),

	minPrice: parseAsInteger,
	maxPrice: parseAsInteger,
	category: parseAsArrayOf(parseAsString),
	sellerId: parseAsString,
	inStock: parseAsBoolean,
	// currency: parseAsStringLiteral(["BAHT", "KYAT"]).withDefault("BAHT"),

	sortBy: parseAsStringLiteral([
		"price-asc",
		"price-desc",
		"name-asc",
		"name-desc",
		"newest",
	]).withDefault("newest"),
};

export const loadFilters = createLoader(searchParams);

export const useFilters = (options: Options = {}) =>
	useQueryStates(searchParams, {
		shallow: false,
		...options,
	});
