import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#059669" },
		{ media: "(prefers-color-scheme: dark)", color: "#047857" },
	],
};

export const metadata: Metadata = {
	metadataBase: new URL("https://www.orbtao.com"), // Replace with your actual domain
	title: {
		default: "Community Library - Share Knowledge, Build Community",
		template: "%s | Community Library",
	},
	description:
		"A platform for sharing books and building learning communities. Lend, borrow, and discover books in your area. Connect with neighbors and build stronger communities through reading.",
	keywords: [
		"community library",
		"book sharing",
		"book lending",
		"local library",
		"book exchange",
		"neighborhood library",
		"book borrowing",
		"community reading",
		"local book sharing",
		"book lending platform",
		"community books",
		"neighborhood books",
		"book sharing app",
		"local book exchange",
		"community learning",
		"book discovery",
		"reading community",
		"book sharing network",
	],
	authors: [{ name: "Community Library Team" }],
	creator: "Community Library",
	publisher: "Community Library",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://www.orbtao.com",
		siteName: "Community Library",
		title: "Community Library - Share Knowledge, Build Community",
		description:
			"A platform for sharing books and building learning communities. Lend, borrow, and discover books in your area.",
		images: [
			{
				url: "/community.jpg",
				width: 1200,
				height: 630,
				alt: "Community Library - Share Knowledge, Build Community",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Community Library - Share Knowledge, Build Community",
		description:
			"A platform for sharing books and building learning communities. Lend, borrow, and discover books in your area.",
		images: ["/community.jpg"],
		creator: "@communitylibrary", // Replace with your actual Twitter handle
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: "https://www.orbtao.com",
	},
	category: "education",
	classification: "Community Library Platform",
	referrer: "origin-when-cross-origin",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Community Library",
		description:
			"A platform for sharing books and building learning communities. Lend, borrow, and discover books in your area.",
		url: "https://www.orbtao.com",
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate:
					"https://www.orbtao.com/books?search={search_term_string}",
			},
			"query-input": "required name=search_term_string",
		},
		publisher: {
			"@type": "Organization",
			name: "Community Library",
			url: "https://www.orbtao.com",
			logo: {
				"@type": "ImageObject",
				url: "https://www.orbtao.com/community.jpg",
			},
		},
		mainEntity: {
			"@type": "Service",
			name: "Community Library Service",
			description:
				"Book sharing and lending platform for local communities",
			provider: {
				"@type": "Organization",
				name: "Community Library",
			},
			serviceType: "Library Service",
			areaServed: "Global",
			availableChannel: {
				"@type": "ServiceChannel",
				serviceUrl: "https://www.orbtao.com",
				serviceSmsNumber: null,
				servicePhone: null,
			},
		},
	};

	return (
		<html lang='en' suppressHydrationWarning>
			<head suppressHydrationWarning>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>
				<meta
					name='google-adsense-account'
					content='ca-pub-3138751846532107'
				/>
			</head>
			<body className={inter.className} suppressHydrationWarning>
				<AuthProvider>
					{children}
					<Toaster position='bottom-right' />
				</AuthProvider>
			</body>
		</html>
	);
}
