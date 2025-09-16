import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const baseUrl = "https://www.orbtao.com"; // Replace with your actual domain

	return {
		rules: {
			userAgent: "*",
			allow: [
				"/",
				"/about",
				"/books",
				"/contact",
				"/login",
				"/signup",
				"/privacy",
				"/terms",
				"/cookies",
				"/book/*", // Individual book pages
			],
			disallow: [
				"/admin",
				"/api",
				"/profile",
				"/my-books",
				"/borrowed",
				"/add-book",
				"/forgot-password",
				"/reset-password",
				"/verify-otp",
				"/_next",
				"/static",
			],
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
