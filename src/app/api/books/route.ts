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

		// Parse multipart form data
		const formData = await request.formData();
		const title = formData.get("title") as string;
		const author = formData.get("author") as string;
		const isbn = formData.get("isbn") as string;
		const genre = formData.get("genre") as string;
		const description = formData.get("description") as string;
		const condition = formData.get("condition") as string;
		const address = formData.get("address") as string;
		const image = formData.get("image") as File;

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

		// Convert file to Buffer for Cloudinary
		const buffer = Buffer.from(await image.arrayBuffer());

		const imageUrl = await uploadImage(buffer);
		if (!imageUrl) {
			return NextResponse.json(
				{ message: "Failed to upload image", success: false },
				{ status: 500 }
			);
		}
		const newBook = await Book.create({
			title,
			author,
			isbn,
			image: imageUrl,
			genre,
			description,
			condition,
			address,
			owner: decoded.userId,
			status: "available",
		});

		return NextResponse.json({
			book: newBook,
			success: true,
			message: "Book added successfully",
		});
	} catch (error) {
		console.error("Error adding book:", error);
		return NextResponse.json(
			{ message: "Failed to add book", success: false },
			{ status: 500 }
		);
	}
}
