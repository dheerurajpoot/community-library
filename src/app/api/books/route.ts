import { type NextRequest, NextResponse } from "next/server";
import Book from "@/models/Book";
import { verifyToken } from "@/lib/utils";
import { connectDb } from "@/lib/database";

export async function GET(request: NextRequest) {
	try {
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
		const owner = request.nextUrl.searchParams.get("owner");
		let books;
		if (owner) {
			books = await Book.find({ owner: owner }).populate("owner");
		} else {
			books = await Book.find().populate("owner");
		}

		return NextResponse.json({
			books,
			success: true,
			message: "Books fetched successfully",
		});
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to fetch books", success: false },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		await connectDb();
		const {
			title,
			author,
			genre,
			description,
			condition,
			address,
			isbn,
			image,
		} = await request.json();

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

		const owner = decoded.userId;

		// Validate required fields
		if (
			!title ||
			!author ||
			!genre ||
			!address ||
			!isbn ||
			!owner ||
			!image
		) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 }
			);
		}

		const newBook = {
			title,
			author,
			isbn,
			image,
			genre,
			description: description || "",
			condition,
			owner,
			address,
			status: "available",
			createdAt: new Date().toISOString(),
		};

		const savedBook = await Book.create(newBook);

		return NextResponse.json(
			{ savedBook, success: true, message: "Book created successfully" },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to create book", success: false },
			{ status: 500 }
		);
	}
}
