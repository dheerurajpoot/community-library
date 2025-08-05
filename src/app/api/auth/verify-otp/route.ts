import { type NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/database";
import User from "@/models/User";

export async function POST(request: NextRequest) {
	try {
		await connectDb();
		const { email, otp } = await request.json();

		if (!email || !otp) {
			return NextResponse.json(
				{ error: "Email and OTP are required" },
				{ status: 400 }
			);
		}

		const user = await User.findOne({
			email,
			emailVerificationOtp: otp,
			emailVerificationExpires: { $gt: new Date() },
		});

		if (!user) {
			return NextResponse.json(
				{ error: "Invalid or expired OTP" },
				{ status: 400 }
			);
		}

		await User.updateOne(
			{ _id: user._id },
			{
				$set: {
					isEmailVerified: true,
					updatedAt: new Date(),
				},
				$unset: {
					emailVerificationOtp: "",
					emailVerificationExpires: "",
				},
			}
		);

		return NextResponse.json({
			message: "Email verified successfully",
			success: true,
		});
	} catch (error) {
		console.error("Verify email error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
