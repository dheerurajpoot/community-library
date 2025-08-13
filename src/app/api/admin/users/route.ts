import { type NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/utils";
import User from "@/models/User";
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
		if (user.role !== "admin") {
			return NextResponse.json(
				{ message: "Unauthorized", success: false },
				{ status: 401 }
			);
		}

		const users = await User.find().select("-password");

		return NextResponse.json({
			users,
			success: true,
			message: "Users fetched successfully",
			status: 200,
		});
	} catch (error) {
		console.error("Get users error:", error);
		return NextResponse.json(
			{ message: "Internal server error", success: false },
			{ status: 500 }
		);
	}
}
export async function PUT(request: NextRequest) {
	try {
		await connectDb();
		const user = await getAdminFromToken(request);
		if (user.role !== "admin") {
			return NextResponse.json(
				{ message: "Unauthorized", success: false },
				{ status: 401 }
			);
		}
		const { userId, ...data } = await request.json();

		const updatedUser = await User.findByIdAndUpdate(userId, data);

		return NextResponse.json({
			updatedUser,
			success: true,
			message: "User updated successfully",
			status: 200,
		});
	} catch (error) {
		console.error("Update user error:", error);
		return NextResponse.json(
			{ message: "Internal server error", success: false },
			{ status: 500 }
		);
	}
}
export async function DELETE(request: NextRequest) {
	try {
		await connectDb();
		const user = await getAdminFromToken(request);
		if (user.role !== "admin") {
			return NextResponse.json(
				{ message: "Unauthorized", success: false },
				{ status: 401 }
			);
		}
		const userId = await request.json();

		const deletedUser = await User.findByIdAndUpdate(userId, {
			$set: {
				isActive: "deleted",
			},
		});

		return NextResponse.json({
			deletedUser,
			success: true,
			message: "User deleted successfully",
			status: 200,
		});
	} catch (error) {
		console.error("Delete user error:", error);
		return NextResponse.json(
			{ message: "Internal server error", success: false },
			{ status: 500 }
		);
	}
}
