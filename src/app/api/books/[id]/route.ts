import { type NextRequest, NextResponse } from "next/server";
import Book from "@/models/Book";
import { verifyToken } from "@/lib/utils";
import { connectDb } from "@/lib/database";

function extractIdFromRequest(request: NextRequest) {
	const url = new URL(request.url, process.env.NEXT_PUBLIC_APP_URL);
	const pathParts = url.pathname.split("/");
	return pathParts[pathParts.length - 1];
}

export async function GET(request: NextRequest) {
	await connectDb();
	const id = extractIdFromRequest(request);
	try {
		const book = await Book.findById(id).populate("owner");
		if (!book) {
			return NextResponse.json(
				{ message: "Book not found", success: false },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ book, success: true, message: "Book fetched successfully" },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to fetch book", success: false },
			{ status: 500 }
		);
	}
}

export async function PUT(request: NextRequest) {
	await connectDb();
	try {
		const body = await request.json();
		const id = extractIdFromRequest(request);
		let book = await Book.findById(id).populate("owner");

		if (!book) {
			return NextResponse.json(
				{ message: "Book not found", success: false },
				{ status: 404 }
			);
		}

		book = { ...book, ...body };

		await book.save();

		return NextResponse.json(
			{ book, success: true, message: "Book updated successfully" },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to update book", success: false },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: NextRequest) {
	await connectDb();
	const token = request.cookies.get("token");
	if (!token) {
		return NextResponse.json(
			{ message: "Authorization token required", success: false },
			{ status: 401 }
		);
	}

	const decoded = verifyToken(token.value);
	if (!decoded) {
		return NextResponse.json(
			{ message: "Invalid or expired token", success: false },
			{ status: 401 }
		);
	}
	const id = extractIdFromRequest(request);
	try {
		const book = await Book.findById(id);
		if (!book) {
			return NextResponse.json(
				{ message: "Book not found", success: false },
				{ status: 404 }
			);
		}

		if (book.owner.toString() !== decoded.userId) {
			return NextResponse.json(
				{ message: "Unauthorized", success: false },
				{ status: 401 }
			);
		}

		await book.deleteOne();

		return NextResponse.json(
			{ message: "Book deleted successfully", success: true },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to delete book", success: false },
			{ status: 500 }
		);
	}
}
