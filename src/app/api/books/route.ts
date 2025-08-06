import { type NextRequest, NextResponse } from "next/server";
import Book from "@/models/Book";
import { verifyToken } from "@/lib/utils";
import { connectDb } from "@/lib/database";
import { uploadImage } from "@/lib/image-upload";

export async function GET(request: NextRequest) {
	try {
		await connectDb();

		const searchParams = request.nextUrl.searchParams;
		const search = searchParams.get("search");
		let books;

		if (search) {
			const searchRegex = { $regex: search, $options: "i" };

			books = await Book.find({
				$or: [
					{ title: searchRegex },
					{ author: searchRegex },
					{ genre: searchRegex },
					{ isbn: searchRegex },
				],
			}).populate("owner");
		} else {
			books = await Book.find().populate("owner");
		}

		return NextResponse.json({
			books,
			success: true,
			message: "Books fetched successfully",
		});
	} catch (error) {
		console.error("Error fetching books:", error);
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

		console.log("Image:", image);

		const imageUrl = await uploadImage(image);
		if (!imageUrl) {
			return NextResponse.json(
				{ message: "Failed to upload image", success: false },
				{ status: 500 }
			);
		}
		console.log("Image URL:", imageUrl);

		const newBook = await Book.create({
			title,
			author,
			isbn,
			image: imageUrl,
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
