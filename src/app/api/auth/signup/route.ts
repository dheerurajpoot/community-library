import { type NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/database";
import { hashPassword, generateOTP } from "@/lib/utils";
import { generateOTPEmail, sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
	try {
		await connectDB();
		const { firstName, lastName, email, phone, address, password } =
			await request.json();

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return NextResponse.json(
				{
					success: false,
					message: "User already exists with this email",
				},
				{ status: 400 }
			);
		}

		const hashedPassword = await hashPassword(password);

		const user = await User.create({
			name: `${firstName} ${lastName}`,
			email,
			phone,
			address,
			password: hashedPassword,
			role: "user",
			isActive: true,
			isEmailVerified: false,
		});

		const otp = generateOTP();
		const emailVerificationExpires = new Date(Date.now() + 3600000);
		await User.updateOne(
			{ _id: user._id },
			{ emailVerificationOtp: otp, emailVerificationExpires }
		);
		const emailHtml = generateOTPEmail(otp);
		await sendEmail({
			to: email,
			subject: "Verify Your Email - Community Library",
			html: emailHtml,
		});
		return NextResponse.json({
			success: true,
			user,
			message: "Account created successfully",
		});
	} catch (error) {
		console.log("Error in register route", error);
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		);
	}
}
