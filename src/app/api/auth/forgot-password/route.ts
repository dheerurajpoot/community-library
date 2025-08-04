import { type NextRequest, NextResponse } from "next/server"
import type { User, ForgotPasswordRequest } from "@/models"
import { generateResetToken, resetTokenStorage } from "@/lib/utils/auth"
import { sendEmail, generatePasswordResetEmail } from "@/lib/utils/email"

// In-memory storage (use database in production)
const users: User[] = [
  {
    id: "1",
    email: "demo@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm",
    firstName: "Demo",
    lastName: "User",
    phone: "+1 (555) 123-4567",
    address: "123 Main St",
    city: "Demo City",
    state: "DC",
    zipCode: "12345",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body: ForgotPasswordRequest = await request.json()

    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Find user by email
    const user = users.find((u) => u.email === body.email)
    if (!user) {
      // Don't reveal if email exists or not for security
      return NextResponse.json({
        message: "If an account with that email exists, we have sent a password reset link.",
      })
    }

    // Generate reset token
    const resetToken = generateResetToken()
    const tokenExpires = Date.now() + 60 * 60 * 1000 // 1 hour

    // Store reset token
    resetTokenStorage.set(resetToken, {
      email: user.email,
      expires: tokenExpires,
    })

    // Create reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`

    // Send reset email
    await sendEmail(user.email, "Reset Your Password - Community Library", generatePasswordResetEmail(resetLink))

    return NextResponse.json({
      message: "If an account with that email exists, we have sent a password reset link.",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
