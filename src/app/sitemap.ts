import { MetadataRoute } from "next";
import { Book } from "./my-books/page";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://www.orbtao.com"; // Replace with your actual domain

	// Static routes
	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/books`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/login`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${baseUrl}/signup`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${baseUrl}/add-book`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/my-books`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.6,
		},
		{
			url: `${baseUrl}/borrowed`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.6,
		},
		{
			url: `${baseUrl}/profile`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		},
		{
			url: `${baseUrl}/forgot-password`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${baseUrl}/reset-password`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${baseUrl}/verify-otp`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${baseUrl}/privacy`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.4,
		},
		{
			url: `${baseUrl}/terms`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.4,
		},
		{
			url: `${baseUrl}/cookies`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.4,
		},
	];

	// Dynamic routes - fetch books from API
	try {
		const booksResponse = await fetch(`${baseUrl}/api/books`, {
			next: { revalidate: 3600 }, // Revalidate every hour
		});

		if (booksResponse.ok) {
			const booksData = await booksResponse.json();
			const bookRoutes: MetadataRoute.Sitemap =
				booksData.books?.map((book: Book) => ({
					url: `${baseUrl}/book/${book._id}`,
					lastModified: new Date(book.updatedAt || book.createdAt),
					changeFrequency: "weekly",
					priority: 0.8,
				})) || [];

			return [...staticRoutes, ...bookRoutes];
		}
	} catch (error) {
		console.error("Error fetching books for sitemap:", error);
	}

	return staticRoutes;
}
