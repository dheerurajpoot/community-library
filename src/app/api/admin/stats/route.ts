import { type NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/utils";
import User from "@/models/User";
import Book from "@/models/Book";
import BorrowTransaction from "@/models/BorrowTransaction";
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

		const users = await User.countDocuments();
		const books = await Book.countDocuments();
		const borrowTransactions = await BorrowTransaction.countDocuments();
		const newUsersThisMonth = await User.countDocuments({
			createdAt: {
				$gte: new Date(new Date().setDate(1)),
			},
		});
		const newBooksThisMonth = await Book.countDocuments({
			createdAt: {
				$gte: new Date(new Date().setDate(1)),
			},
		});

		const popularGenres = await Book.aggregate([
			{
				$group: {
					_id: "$genre",
					count: { $sum: 1 },
				},
			},
			{
				$sort: { count: -1 },
			},
		]);

		const stats = {
			totalUsers: users,
			totalBooks: books,
			totalTransactions: borrowTransactions,
			activeLoans: 234,
			newUsersThisMonth: newUsersThisMonth,
			newBooksThisMonth: newBooksThisMonth,
			popularGenres: popularGenres,
		};

		return NextResponse.json({ stats, success: true }, { status: 200 });
	} catch (error) {
		console.error("Get stats error:", error);
		return NextResponse.json(
			{ message: "Internal server error", success: false },
			{ status: 500 }
		);
	}
}
