import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "../index.css";
import { getLocale } from "next-intl/server";
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

	return (
		<html lang={locale} suppressHydrationWarning>
			{process.env.NODE_ENV === "development" && (
				<head>
					<script
						crossOrigin="anonymous"
						src="//unpkg.com/react-scan/dist/auto.global.js"
					/>
				</head>
			)}
			<body className={`${inter.variable} antialiased`}>
				<NuqsAdapter>
					<NextIntlClientProvider>
						<Providers>
							<div className="root">
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
