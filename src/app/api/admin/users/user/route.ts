import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/database";
import User from "@/models/User";

export async function POST(request: NextRequest) {
	try {
		await connectDb();
		const { userId } = await request.json();
		const user = await User.findById(userId).select("-password");

		return NextResponse.json({
			user,
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
