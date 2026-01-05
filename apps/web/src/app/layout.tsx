import type { Metadata } from "next";

import { Nunito_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "../index.css";
import { getLocale, getMessages } from "next-intl/server";
import Header from "@/components/header";
import Providers from "@/components/providers";

const nunitoSans = Nunito_Sans({ variable: "--font-sans" });

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
			<body className="antialiased">
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
