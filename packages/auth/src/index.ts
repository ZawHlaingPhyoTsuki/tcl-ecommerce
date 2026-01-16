import { expo } from "@better-auth/expo";
import prisma, { UserRole } from "@tcl-ecommerce/db";
import { env } from "@tcl-ecommerce/env/server";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	trustedOrigins: [env.CORS_ORIGIN, "tcl-ecommerce://", "exp://"],
	emailAndPassword: {
		enabled: true,
	},
	user: {
		additionalFields: {
			role: {
				type: "string",
				default: UserRole.CUSTOMER,
			},
		},
	},
	advanced: {
		defaultCookieAttributes: {
			sameSite: "none",
			secure: true,
			httpOnly: true,
		},
	},
	plugins: [expo()],
});
