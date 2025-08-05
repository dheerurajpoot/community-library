import { comparePassword, generateToken } from "@/lib/utils";
import User from "@/models/User";
import { type NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/database";

export async function POST(request: NextRequest) {
	try {
		// Connect to MongoDB
		await connectDb();

		const { email, password } = await request.json();

		const user = await User.findOne({ email });

		if (!user) {
			return NextResponse.json(
				{ success: false, message: "User not found with this email!" },
				{ status: 404 }
			);
		}

		// Check if user is active
		if (!user.isActive) {
			return NextResponse.json(
				{
					success: false,
					message: "Account is not active contact support!",
				},
				{ status: 403 }
			);
		}

		const isPasswordValid = await comparePassword(password, user.password);

		if (!isPasswordValid) {
			return NextResponse.json(
				{ success: false, message: "Invalid password, Try again!" },
				{ status: 401 }
			);
		}

		const token = generateToken(user._id.toString());
		const response = NextResponse.json({
			message: "Login successful",
			success: true,
			user: {
				_id: user._id,
				name: user.name,
				phone: user.phone,
				email: user.email,
				role: user.role,
				isActive: user.isActive,
				isBlocked: user.isBlocked,
			},
		});

		response.cookies.set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 30 * 24 * 60 * 60,
		});

		return response;
	} catch (error) {
		console.log("Error in login route", error);
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		);
	}
}
