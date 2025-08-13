import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/database";
import Book from "@/models/Book";

export async function POST(request: NextRequest) {
	try {
		await connectDb();
		const { bookId } = await request.json();
		const book = await Book.findById(bookId).populate("owner");

		return NextResponse.json({
			book,
			success: true,
			message: "Book fetched successfully",
			status: 200,
		});
	} catch (error) {
		console.error("Get book error:", error);
		return NextResponse.json(
			{ message: "Internal server error", success: false },
			{ status: 500 }
		);
	}
}

export async function PUT(request: NextRequest) {
	try {
		await connectDb();
		const { bookId, ...data } = await request.json();
		const updatedBook = await Book.findByIdAndUpdate(bookId, data);

		return NextResponse.json({
			updatedBook,
			success: true,
			message: "Book updated successfully",
			status: 200,
		});
	} catch (error) {
		console.error("Update book error:", error);
		return NextResponse.json(
			{ message: "Internal server error", success: false },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: NextRequest) {
	try {
		await connectDb();
		const { bookId } = await request.json();
		const deletedBook = await Book.findByIdAndDelete(bookId);

		return NextResponse.json({
			deletedBook,
			success: true,
			message: "Book deleted successfully",
			status: 200,
		});
	} catch (error) {
		console.error("Delete book error:", error);
		return NextResponse.json(
			{ message: "Internal server error", success: false },
			{ status: 500 }
		);
	}
}
