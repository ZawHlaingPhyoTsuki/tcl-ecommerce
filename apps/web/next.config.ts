import createNextIntlPlugin from "next-intl/plugin";
import "@tcl-ecommerce/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "res.cloudinary.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
				pathname: "/**", // Allows all paths from this domain
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				pathname: "/**",
			},
		],
		// deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		// imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},
};

const withNextIntl = createNextIntlPlugin({
	requestConfig: "./src/i18n/request.ts",
});
export default withNextIntl(nextConfig);
