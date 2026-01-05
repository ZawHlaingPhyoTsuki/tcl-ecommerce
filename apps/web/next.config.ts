import createNextIntlPlugin from "next-intl/plugin";
import "@tcl-ecommerce/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				pathname: "/**",
			},
		],
	},
};

const withNextIntl = createNextIntlPlugin({
	requestConfig: "./src/i18n/request.ts",
});
export default withNextIntl(nextConfig);
