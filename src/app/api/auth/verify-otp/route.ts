import { type NextRequest, NextResponse } from "next/server"
import type { User, VerifyOTPRequest } from "@/models"
import { generateToken, otpStorage } from "@/lib/utils/auth"

// In-memory storage (use database in production)
const users: User[] = []

export async function POST(request: NextRequest) {
  try {
    const body: VerifyOTPRequest = await request.json()

    if (!body.email || !body.otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 })
    }

    // Get stored OTP data
    const otpData = otpStorage.get(body.email)
    if (!otpData) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
    }

    // Check if OTP is expired
    if (Date.now() > otpData.expires) {
      otpStorage.delete(body.email)
      return NextResponse.json({ error: "OTP has expired. Please request a new one." }, { status: 400 })
    }

    // Verify OTP
    if (otpData.otp !== body.otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
    }

    // Create user
    const newUser: User = {
      id: (users.length + 1).toString(),
      email: otpData.userData.email,
      password: otpData.userData.password,
      firstName: otpData.userData.firstName,
      lastName: otpData.userData.lastName,
      phone: otpData.userData.phone,
      address: "",
      city: "",
      state: "",
      zipCode: "",
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    users.push(newUser)

    // Clean up OTP storage
    otpStorage.delete(body.email)

    // Generate JWT token
    const token = generateToken(newUser.id)

    // Remove password from response
    const { password, ...userWithoutPassword } = newUser

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error("OTP verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
