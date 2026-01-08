import { env } from "@tcl-ecommerce/env/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: env.CLOUDINARY_CLOUD_NAME,
	api_key: env.CLOUDINARY_API_KEY,
	api_secret: env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
	buffer: Buffer,
	options: {
		folder: string;
		public_id?: string;
	},
): Promise<{
	url: string;
	publicId: string;
	width: number;
	height: number;
}> => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader
			.upload_stream(
				{
					resource_type: "image",
					folder: options.folder,
					public_id: options.public_id,
					overwrite: true,
				},
				(error, result) => {
					if (error) return reject(error);
					if (!result) return reject(new Error("Upload failed"));
					resolve({
						url: result.secure_url,
						publicId: result.public_id,
						width: result.width,
						height: result.height,
					});
				},
			)
			.end(buffer);
	});
};

export const deleteFromCloudinary = async (publicId: string) => {
	return cloudinary.uploader.destroy(publicId);
};
