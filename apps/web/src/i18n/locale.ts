"use server";

import { cookies } from "next/headers";
import { defaultLocale, type Locale, locales } from "@/i18n/config";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
	const cookieValue = (await cookies()).get(COOKIE_NAME)?.value;
	if (cookieValue && locales.includes(cookieValue as Locale)) {
		return cookieValue as Locale;
	}

	return defaultLocale;
}

export async function setUserLocale(locale: Locale) {
	(await cookies()).set(COOKIE_NAME, locale);
}
