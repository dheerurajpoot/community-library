import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import { hashPassword } from "@/lib/utils";
import User from "@/models/User";

export async function POST(request: NextRequest) {
	try {
		await connectDB();
		const { token, password } = await request.json();

		if (!token || !password) {
			return NextResponse.json(
				{ error: "Token and password are required", success: false },
				{ status: 400 }
			);
		}

		if (password.length < 6) {
			return NextResponse.json(
				{
					error: "Password must be at least 6 characters long",
					success: false,
				},
				{ status: 400 }
			);
		}

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

		const hashedPassword = await hashPassword(password);

		await User.updateOne(
			{ _id: user._id },
			{
				$set: {
					password: hashedPassword,
					updatedAt: new Date(),
				},
				$unset: {
					passwordResetToken: "",
					passwordResetExpires: "",
				},
			}
		);

		return NextResponse.json({
			message: "Password reset successful",
			success: true,
		});
	} catch (error) {
		console.error("Reset password error:", error);
		return NextResponse.json(
			{ error: "Internal server error", success: false },
			{ status: 500 }
		);
	}
}
