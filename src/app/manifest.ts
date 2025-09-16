import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Community Library",
		short_name: "Community Library",
		description:
			"A platform for sharing books and building learning communities. Lend, borrow, and discover books in your area.",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#059669",
		icons: [
			{
				src: "/favicon.ico",
				sizes: "any",
				type: "image/x-icon",
			},
			{
				src: "/community.jpg",
				sizes: "192x192",
				type: "image/jpeg",
			},
			{
				src: "/community.jpg",
				sizes: "512x512",
				type: "image/jpeg",
			},
		],
		categories: ["education", "books", "community"],
		lang: "en",
		orientation: "portrait",
		scope: "/",
	};
}
