import { type NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/utils";
import User from "@/models/User";
import Book from "@/models/Book";
import { connectDb } from "@/lib/database";

async function getAdminFromToken(request: NextRequest) {
	const authHeader = request.cookies.get("token");
	if (!authHeader) {
		return null;
	}

	const token = authHeader.value;
	const decoded = verifyToken(token);
	if (!decoded) return null;

	return User.findOne({ _id: decoded.userId }) || null;
}

export async function GET(request: NextRequest) {
	try {
		await connectDb();
		const user = await getAdminFromToken(request);
		if (!user || user.role !== "admin") {
			return NextResponse.json(
				{ message: "Unauthorized", success: false },
				{ status: 401 }
			);
		}

		const books = await Book.find().populate("owner");

		return NextResponse.json({
			books,
			success: true,
			message: "Books fetched successfully",
		});
	} catch (error) {
		console.error("Get books error:", error);
		return NextResponse.json(
			{ message: "Internal server error", success: false },
			{ status: 500 }
		);
	}
}
