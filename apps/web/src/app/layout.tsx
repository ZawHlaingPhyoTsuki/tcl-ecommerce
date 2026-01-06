import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "../index.css";
import { getLocale, getMessages } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Header from "@/components/header";
import Providers from "@/components/providers";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "tcl-ecommerce",
	description: "tcl-ecommerce",
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({
	children,
}: Readonly<RootLayoutProps>) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={`${inter.variable} antialiased`}>
				<NuqsAdapter>
					<NextIntlClientProvider messages={messages}>
						<Providers>
							<div className="root grid h-svh grid-rows-[auto_1fr]">
								<Header />
								{children}
							</div>
						</Providers>
					</NextIntlClientProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
}
