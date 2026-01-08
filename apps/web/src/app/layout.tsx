import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "../index.css";
import { getLocale } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Header from "@/components/header";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
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
		<html lang={locale} className={inter.className} suppressHydrationWarning>
			{process.env.NODE_ENV === "development" && (
				<head>
					<script
						crossOrigin="anonymous"
						src="//unpkg.com/react-scan/dist/auto.global.js"
					/>
				</head>
			)}
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
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
