import { type NextRequest, NextResponse } from "next/server";
import BorrowTransaction from "@/models/BorrowTransaction";
import Book from "@/models/Book";
import { verifyToken } from "@/lib/utils";
import { connectDb } from "@/lib/database";

export async function GET(request: NextRequest) {
	try {
		await connectDb();
		const token = request.cookies.get("token");
		if (!token) {
			return NextResponse.json(
				{
					message: "First Login to get your borrowed books",
					success: false,
				},
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
		const userTransactions = await BorrowTransaction.find({
			borrower: decoded.userId,
		})
			.populate("book")
			.populate("owner");

		return NextResponse.json(
			{
				transactions: userTransactions,
				success: true,
				message: "Borrowed books fetched successfully",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Failed to fetch borrowed books:", error);
		return NextResponse.json(
			{ message: "Failed to fetch borrowed books", success: false },
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
				{ message: "Login to borrow a book!", success: false },
				{ status: 401 }
			);
		}
		const decoded = verifyToken(token.value);
		if (!decoded) {
			return NextResponse.json(
				{ message: "Invalid or expired login", success: false },
				{ status: 401 }
			);
		}
		const { bookId, returnDate } = await request.json();
		const borrower = decoded.userId;

		if (!bookId || !borrower || !returnDate) {
			return NextResponse.json(
				{ message: "Missing required fields", success: false },
				{ status: 400 }
			);
		}

		// Find the book
		const book = await Book.findById(bookId);
		if (!book) {
			return NextResponse.json(
				{ message: "Book not found", success: false },
				{ status: 404 }
			);
		}

		if (book.status !== "available") {
			return NextResponse.json(
				{
					message: "Book is not available for borrowing",
					success: false,
				},
				{ status: 400 }
			);
		}

		// Create transaction
		const newTransaction = new BorrowTransaction({
			book,
			borrower,
			owner: book.owner,
			borrowDate: new Date().toISOString(),
			returnDate,
			status: "borrowed",
		});

		await newTransaction.save();

		// Update book status
		book.status = "borrowed";
		await book.save();

		return NextResponse.json(
			{
				message: "Book borrowed successfully",
				success: true,
				transaction: newTransaction,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Failed to borrow book:", error);
		return NextResponse.json(
			{ message: "Failed to borrow book", success: false },
			{ status: 500 }
		);
	}
}
