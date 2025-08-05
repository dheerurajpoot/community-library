import { type NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { verifyToken } from "@/lib/utils";
import { connectDb } from "@/lib/database";

export async function PUT(request: NextRequest) {
	await connectDb();
	try {
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

		const { firstName, lastName, phone, address } = await request.json();

		// Find user
		let user = await User.findOne({ _id: decoded.userId });
		if (!user) {
			return NextResponse.json(
				{ message: "User not found", success: false },
				{ status: 404 }
			);
		}

		// Update user profile
		user = {
			name: firstName + " " + lastName || user.name,
			phone: phone || user.phone,
			address: address || user.address,
		};

		return NextResponse.json({
			user,
			message: "Profile updated successfully",
			success: true,
		});
	} catch (error) {
		console.error("Update profile error:", error);
		return NextResponse.json(
			{ message: "Internal server error", success: false },
			{ status: 500 }
		);
	}
}
