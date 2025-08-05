import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import { generateResetToken } from "@/lib/utils";
import { sendEmail, generatePasswordResetEmail } from "@/lib/email";
import User from "@/models/User";

export async function POST(request: NextRequest) {
	try {
		await connectDB();
		const { email } = await request.json();

		if (!email) {
			return NextResponse.json(
				{ error: "Email is required", success: false },
				{ status: 400 }
			);
		}

		const user = await User.findOne({ email });

		if (!user) {
			return NextResponse.json(
				{ error: "User not found", success: false },
				{ status: 404 }
			);
		}

		const resetToken = generateResetToken();
		const resetExpires = new Date(Date.now() + 3600000); // 1 hour

		const updatedUser = await User.findByIdAndUpdate(
			user._id,
			{
				passwordResetToken: resetToken,
				passwordResetExpires: resetExpires,
				updatedAt: new Date(),
			},
			{ new: true }
		);

		const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
		const emailHtml = generatePasswordResetEmail(resetUrl);

		await sendEmail({
			to: email,
			subject: "Reset Your Password - Community Library",
			html: emailHtml,
		});

		return NextResponse.json(
			{ message: "Password reset email sent", success: true },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Forgot password error:", error);
		return NextResponse.json(
			{ error: "Internal server error", success: false },
			{ status: 500 }
		);
	}
}
