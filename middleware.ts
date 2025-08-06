import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
	matcher: [
		"/",
		"/auth/login",
		"/auth/signup",
		"/auth/verify-otp",
		"/auth/logout",
		"/auth/forgot-password",
		"/dashboard/:path*",
		"/about",
		"/auth/verify-reset-token",
		"/blog/:path*",
		"/auth/reset-password",
		"/auth/verify-otp",
		"/auth/logout",
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};

export async function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value || "";
	const { pathname } = request.nextUrl;

	// Always allow API routes to pass through
	if (pathname.startsWith("/api/")) {
		return NextResponse.next();
	}

	// Public routes that don't require authentication
	const publicRoutes = [
		"/auth/login",
		"/auth/signup",
		"/auth/verify-otp",
		"/auth/forgot-password",
		"/auth/reset-password",
		"/auth/verify-otp",
		"/",
		"/about",
		"/blog/:path*",
		"/contact",
		"/faq",
		"/privacy-policy",
		"/terms-of-service",
		"/how-it-works",
		"/blog",
	];

	// Check if the current path is a public route
	const isPublicRoute = publicRoutes.some((route) => {
		if (route === "/") return pathname === "/";
		if (route.includes(":path*")) {
			const base = route.replace("/:path*", "");
			return pathname.startsWith(base);
		}
		return pathname === route;
	});

	// Check if the current path is an admin route
	const isAdminRoute = pathname.startsWith("/admin/");

	const authPages = [
		"/auth/login",
		"/auth/signup",
		"/auth/forgot-password",
		"/auth/reset-password",
		"/auth/verify-otp",
		"/auth/verify-reset-token",
		"/auth/logout",
	];

	const isAuthPage = authPages.some((route) => pathname === route);

	if (isAuthPage && token) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	// Handle public routes
	if (isPublicRoute) {
		return NextResponse.next();
	}

	// Handle admin routes
	if (isAdminRoute) {
		if (!token) {
			return NextResponse.redirect(new URL("/auth/login", request.url));
		}
		return NextResponse.next();
	}

	// Handle other protected routes
	if (!token) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	return NextResponse.next();
}
