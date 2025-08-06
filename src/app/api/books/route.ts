import { type NextRequest, NextResponse } from "next/server";
import Book from "@/models/Book";
import { verifyToken } from "@/lib/utils";
import { connectDb } from "@/lib/database";

export async function GET(request: NextRequest) {
	try {
		await connectDb();

		const { searchParams } = request.nextUrl;
		const search = searchParams.get("search") || "";
		const owner = searchParams.get("owner");

		let query: any = {};

		if (owner) {
			const token = request.cookies.get("token")?.value;
			if (!token || !verifyToken(token)) {
				return NextResponse.json(
					{ message: "Unauthorized access", success: false },
					{ status: 401 }
				);
			}
			query.owner = owner;
		} else if (search) {
			const regex = new RegExp(search, "i");
			query.$or = [
				{ title: regex },
				{ author: regex },
				{ genre: regex },
				{ isbn: regex },
			];
		}

		const books = await Book.find(query).populate("owner");

		return NextResponse.json({
			books,
			success: true,
			message: "Books fetched successfully",
		});
	} catch (error) {
		console.error("GET /api/books error:", error);
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
			description = "",
			condition,
			address,
			isbn,
			image,
		} = await request.json();

		const token = request.cookies.get("token")?.value;
		const decoded = token && verifyToken(token);

		if (!decoded) {
			return NextResponse.json(
				{ message: "Unauthorized access", success: false },
				{ status: 401 }
			);
		}

		// Required fields validation
		const requiredFields = { title, author, genre, address, isbn, image };
		for (const [key, value] of Object.entries(requiredFields)) {
			if (!value) {
				return NextResponse.json(
					{ message: `Missing field: ${key}` },
					{ status: 400 }
				);
			}
		}

		const newBook = await Book.create({
			title,
			author,
			isbn,
			image,
			genre,
			description,
			condition,
			owner: decoded.userId,
			address,
			status: "available",
			createdAt: new Date(),
		});

		return NextResponse.json(
			{
				savedBook: newBook,
				success: true,
				message: "Book created successfully",
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("POST /api/books error:", error);
		return NextResponse.json(
			{ message: "Failed to create book", success: false },
			{ status: 500 }
		);
	}
}
