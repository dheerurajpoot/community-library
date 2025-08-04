import { type NextRequest, NextResponse } from "next/server"
import type { User, CreateUserRequest } from "@/models"
import { hashPassword, generateOTP, otpStorage } from "@/lib/utils/auth"
import { sendEmail, generateOTPEmail } from "@/lib/utils/email"

// In-memory storage (use database in production)
const users: User[] = []

export async function POST(request: NextRequest) {
  try {
    const body: CreateUserRequest = await request.json()

    // Validate required fields
    if (!body.email || !body.password || !body.firstName || !body.lastName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === body.email)
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Validate password strength
    if (body.password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hashPassword(body.password)

    // Generate OTP
    const otp = generateOTP()
    const otpExpires = Date.now() + 10 * 60 * 1000 // 10 minutes

    // Store OTP and user data temporarily
    otpStorage.set(body.email, {
      otp,
      expires: otpExpires,
      userData: {
        email: body.email,
        password: hashedPassword,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone || "",
      },
    })

    // Send OTP email
    await sendEmail(body.email, "Verify Your Account - Community Library", generateOTPEmail(otp))

    return NextResponse.json(
      {
        message: "Registration initiated. Please check your email for verification code.",
        email: body.email,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
