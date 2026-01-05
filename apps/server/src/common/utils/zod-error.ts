import type { ZodError } from "zod";

export const formatZodError = (error: ZodError) => {
	return error.issues.map((err) => ({
		path: err.path.join("."),
		message: err.message,
	}));
};
