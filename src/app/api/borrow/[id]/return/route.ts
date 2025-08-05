import { type NextRequest, NextResponse } from "next/server";
import BorrowTransaction from "@/models/BorrowTransaction";
import Book from "@/models/Book";
import { connectDb } from "@/lib/database";

function extractIdFromRequest(request: NextRequest) {
	const url = new URL(request.url, process.env.NEXT_PUBLIC_APP_URL);
	const pathParts = url.pathname.split("/");
	return pathParts[pathParts.length - 1];
}

export async function PUT(request: NextRequest) {
	try {
		await connectDb();
		const transactionId = extractIdFromRequest(request);
		console.log("Transaction ID:", transactionId);
		const transaction = await BorrowTransaction.findById(transactionId);

		if (!transaction) {
			return NextResponse.json(
				{ message: "Transaction not found", success: false },
				{ status: 404 }
			);
		}

		if (transaction.status === "returned") {
			return NextResponse.json(
				{ message: "Book already returned", success: false },
				{ status: 400 }
			);
		}

		// Update transaction
		transaction.status = "returned";
		transaction.returnDate = new Date().toISOString();

		// Update book status back to available
		const book = await Book.findById(transaction.book);
		if (book) {
			book.status = "available";
		}

		await transaction.save();
		await book?.save();

		return NextResponse.json(
			{
				message: "Book returned successfully",
				success: true,
				transaction,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Failed to return book",
				success: false,
				error,
			},
			{ status: 500 }
		);
	}
}
