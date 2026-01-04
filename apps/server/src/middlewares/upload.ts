import multer from "multer";
import { ApiError } from "@/utils/api-error";

const storage = multer.memoryStorage();

export const uploadProductImages = multer({
	storage,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB per file
		files: 5, // max 5 images
	},
	fileFilter: (_req, file, callback) => {
		const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
		if (allowedTypes.includes(file.mimetype)) {
			callback(null, true);
		} else {
			callback(
				ApiError.badRequest("Only JPEG, PNG, and WebP images are allowed"),
			);
		}
	},
});
