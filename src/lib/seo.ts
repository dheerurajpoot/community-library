import { Metadata } from "next";

// SEO Configuration
export const SEO_CONFIG = {
	siteName: "Community Library",
	siteUrl: "https://www.orbtao.com", // Replace with your actual domain
	siteDescription:
		"A platform for sharing books and building learning communities. Lend, borrow, and discover books in your area.",
	defaultImage: "/community.jpg",
	twitterHandle: "@communitylibrary", // Replace with your actual Twitter handle
	googleVerification: "your-google-verification-code", // Replace with your actual Google verification code
};

// Generate metadata for different pages
export function generatePageMetadata({
	title,
	description,
	path = "",
	image,
	noIndex = false,
}: {
	title: string;
	description?: string;
	path?: string;
	image?: string;
	noIndex?: boolean;
}): Metadata {
	const url = `${SEO_CONFIG.siteUrl}${path}`;
	const fullTitle = `${title} | ${SEO_CONFIG.siteName}`;
	const metaDescription = description || SEO_CONFIG.siteDescription;
	const metaImage = image || SEO_CONFIG.defaultImage;

	return {
		title: fullTitle,
		description: metaDescription,
		openGraph: {
			title: fullTitle,
			description: metaDescription,
			url,
			images: [
				{
					url: metaImage,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: fullTitle,
			description: metaDescription,
			images: [metaImage],
			creator: SEO_CONFIG.twitterHandle,
		},
		robots: noIndex ? "noindex,nofollow" : "index,follow",
		alternates: {
			canonical: url,
		},
	};
}

// Structured data for different page types
export const generateStructuredData = {
	website: () => ({
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: SEO_CONFIG.siteName,
		description: SEO_CONFIG.siteDescription,
		url: SEO_CONFIG.siteUrl,
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${SEO_CONFIG.siteUrl}/books?search={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
	}),

	organization: () => ({
		"@context": "https://schema.org",
		"@type": "Organization",
		name: SEO_CONFIG.siteName,
		url: SEO_CONFIG.siteUrl,
		logo: {
			"@type": "ImageObject",
			url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultImage}`,
		},
		description: SEO_CONFIG.siteDescription,
		sameAs: [
			// Add your social media URLs here
			// 'https://twitter.com/communitylibrary',
			// 'https://facebook.com/communitylibrary',
		],
	}),

	book: (bookData: {
		title: string;
		author: string;
		description: string;
		image?: string;
		genre: string;
		isbn?: string;
	}) => ({
		"@context": "https://schema.org",
		"@type": "Book",
		name: bookData.title,
		author: {
			"@type": "Person",
			name: bookData.author,
		},
		description: bookData.description,
		genre: bookData.genre,
		image: bookData.image
			? `${SEO_CONFIG.siteUrl}${bookData.image}`
			: undefined,
		isbn: bookData.isbn,
		offers: {
			"@type": "Offer",
			availability: "https://schema.org/InStock",
			price: "0",
			priceCurrency: "USD",
			description: "Free book sharing service",
		},
	}),

	breadcrumb: (items: Array<{ name: string; url: string }>) => ({
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: `${SEO_CONFIG.siteUrl}${item.url}`,
		})),
	}),
};
