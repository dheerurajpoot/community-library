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
		const books = await Book.find({ owner: decoded.userId }).populate(
			"owner"
		);

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
