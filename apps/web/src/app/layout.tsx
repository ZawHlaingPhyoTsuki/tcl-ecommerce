import type { Metadata } from "next";

import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "../index.css";
import { getLocale, getMessages } from "next-intl/server";
import Header from "@/components/header";
import Providers from "@/components/providers";

const nunitoSans = Nunito_Sans({ variable: "--font-sans" });

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
	const messages = await getMessages();

	return (
		<html
			lang={locale}
			suppressHydrationWarning
			className={nunitoSans.className}
		>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<NextIntlClientProvider messages={messages}>
					<Providers>
						<div className="grid h-svh grid-rows-[auto_1fr]">
							<Header />
							{children}
						</div>
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
