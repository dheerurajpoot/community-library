import { type NextRequest, NextResponse } from "next/server";
import BorrowTransaction from "@/models/BorrowTransaction";
import Book from "@/models/Book";
import { connectDb } from "@/lib/database";
import {
	generateBookReturnEmailToOwner,
	generateBookReturnConfirmationToBorrower,
	sendEmail,
} from "@/lib/email";
import { formatDate } from "@/lib/utils";

function extractIdFromRequest(request: NextRequest) {
	const url = new URL(request.url, process.env.NEXT_PUBLIC_APP_URL);
	const pathParts = url.pathname.split("/");
	return pathParts[pathParts.length - 2];
}

export async function PUT(request: NextRequest) {
	try {
		await connectDb();
		const transactionId = extractIdFromRequest(request);
		const transaction = await BorrowTransaction.findById(
			transactionId
		).populate("borrower");

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
		const book = await Book.findById(transaction.book).populate("owner");
		if (book) {
			book.status = "available";
		}

		// Send email to book owner

		const emailHtml = generateBookReturnEmailToOwner(
			transaction.borrower.name,
			book.title,
			book.author,
			formatDate(transaction.borrowDate),
			formatDate(transaction.returnDate)
		);
		const res = await sendEmail({
			to: book.owner.email,
			subject: `📚 Your book has been returned: ${book.title}`,
			html: emailHtml,
		});
		if (!res.success) {
			return NextResponse.json(
				{
					message: "Failed to send email to owner",
					success: false,
				},
				{ status: 500 }
			);
		}

		// Send confirmation email to borrower
		const emailHtml2 = generateBookReturnConfirmationToBorrower(
			transaction.borrower.name,
			book.title,
			book.author,
			book.owner.name,
			formatDate(transaction.borrowDate),
			formatDate(transaction.returnDate)
		);
		const res2 = await sendEmail({
			to: transaction.borrower.email,
			subject: `✅ Return confirmed: ${book.title}`,
			html: emailHtml2,
		});
		if (!res2.success) {
			return NextResponse.json(
				{
					message: "Failed to send email to borrower",
					success: false,
				},
				{ status: 500 }
			);
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
		console.error("Failed to return book:", error);
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
