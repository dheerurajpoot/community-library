import { type NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { verifyToken } from "@/lib/utils";

export async function GET(request: NextRequest) {
	try {
		const token = request.cookies.get("token");
		if (!token) {
			return NextResponse.json(
				{ error: "Authorization token required", success: false },
				{ status: 401 }
			);
		}

		const decoded = verifyToken(token.value);

		if (!decoded) {
			return NextResponse.json(
				{ error: "Invalid or expired token", success: false },
				{ status: 401 }
			);
		}

		// Find user
		const user = await User.findOne({ _id: decoded.userId }).select(
			"-password"
		);
		if (!user) {
			return NextResponse.json(
				{ error: "User not found", success: false },
				{ status: 404 }
			);
		}

		return NextResponse.json({ user, success: true }, { status: 200 });
	} catch (error) {
		console.error("Get current user error:", error);
		return NextResponse.json(
			{ error: "Internal server error", success: false },
			{ status: 500 }
		);
	}
}
