import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Community Library - Share Knowledge, Build Community",
	description:
		"A platform for sharing books and building learning communities. Lend, borrow, and discover books in your area.",
	keywords:
		"community library, book sharing, book lending, local library, book exchange",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head suppressHydrationWarning></head>
			<body className={inter.className} suppressHydrationWarning>
				<AuthProvider>
					{children}
					<Toaster position='bottom-right' />
				</AuthProvider>
			</body>
		</html>
	);
}
