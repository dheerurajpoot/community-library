import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import User from "@/models/User";

export async function POST(request: NextRequest) {
	try {
		const { token } = await request.json();

		if (!token) {
			return NextResponse.json(
				{ error: "Token is required", success: false },
				{ status: 400 }
			);
		}

		await connectDB();
		const user = await User.findOne({
			passwordResetToken: token,
			passwordResetExpires: { $gt: new Date() },
		});

		if (!user) {
			return NextResponse.json(
				{ error: "Invalid or expired reset token", success: false },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ valid: true, success: true },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Verify reset token error:", error);
		return NextResponse.json(
			{ error: "Internal server error", success: false },
			{ status: 500 }
		);
	}
}
