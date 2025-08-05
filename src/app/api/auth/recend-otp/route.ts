import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import { generateOTP } from "@/lib/utils";
import { generateOTPEmail, sendEmail } from "@/lib/email";
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

		if (user.isEmailVerified) {
			return NextResponse.json(
				{ error: "Email already verified", success: false },
				{ status: 400 }
			);
		}

		const otp = generateOTP();
		const otpExpires = new Date(Date.now() + 600000); // 10 minutes

		await User.updateOne(
			{ email },
			{
				$set: {
					emailVerificationOtp: otp,
					emailVerificationExpires: otpExpires,
					updatedAt: new Date(),
				},
			}
		);

		const emailHtml = generateOTPEmail(otp);
		await sendEmail({
			to: email,
			subject: "Verify Your Email - AffiliateHub",
			html: emailHtml,
		});

		return NextResponse.json(
			{ message: "OTP sent successfully", success: true },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Resend OTP error:", error);
		return NextResponse.json(
			{ error: "Internal server error", success: false },
			{ status: 500 }
		);
	}
}
