// uploading images to cloudinary

import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with error handling
let cloudinaryConfigured = false;
try {
	if (
		process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
		process.env.CLOUDINARY_API_KEY &&
		process.env.CLOUDINARY_API_SECRET
	) {
		cloudinary.config({
			cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		});
		cloudinaryConfigured = true;
		console.log("Cloudinary configured successfully");
	} else {
		console.error("Missing Cloudinary configuration");
	}
} catch (error) {
	console.error("Error configuring Cloudinary:", error);
}

export async function uploadImage(input: string | Buffer): Promise<string> {
	try {
		// If Cloudinary is not configured, return a placeholder URL
		if (!cloudinaryConfigured) {
			console.error(
				"Cloudinary is not configured, using placeholder URL"
			);
			return "";
		}

		let result;

		if (Buffer.isBuffer(input)) {
			const base64Data = `data:image/png;base64,${input.toString(
				"base64"
			)}`;
			result = await cloudinary.uploader.upload(base64Data, {
				folder: "books",
				resource_type: "auto",
			});
		} else if (input.startsWith("data:")) {
			result = await cloudinary.uploader.upload(input, {
				folder: "books",
				resource_type: "auto",
			});
		} else {
			result = await cloudinary.uploader.upload(input, {
				folder: "books",
				resource_type: "auto",
			});
			result = await cloudinary.uploader.upload(input, {
				folder: "books",
				resource_type: "auto",
			});
		}

		if (!result || !result.secure_url) {
			throw new Error("Failed to get secure URL from Cloudinary");
		}

		return result.secure_url;
	} catch (error) {
		console.error("Error uploading image to Cloudinary:", error);
		return "";
	}
}

export function cleanupImage(): void {
}

export function getAbsoluteUrl(publicUrl: string): string {
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
	return `${baseUrl}${publicUrl}`;
}
