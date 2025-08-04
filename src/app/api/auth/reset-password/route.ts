import { type NextRequest, NextResponse } from "next/server"
import type { User, ResetPasswordRequest } from "@/models"
import { hashPassword, resetTokenStorage } from "@/lib/utils/auth"

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
    const body: ResetPasswordRequest = await request.json()

    if (!body.token || !body.password) {
      return NextResponse.json({ error: "Token and password are required" }, { status: 400 })
    }

    // Validate password strength
    if (body.password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    // Get token data
    const tokenData = resetTokenStorage.get(body.token)
    if (!tokenData) {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 })
    }

    // Check if token is expired
    if (Date.now() > tokenData.expires) {
      resetTokenStorage.delete(body.token)
      return NextResponse.json({ error: "Reset token has expired. Please request a new one." }, { status: 400 })
    }

    // Find user
    const userIndex = users.findIndex((u) => u.email === tokenData.email)
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Hash new password
    const hashedPassword = await hashPassword(body.password)

    // Update user password
    users[userIndex] = {
      ...users[userIndex],
      password: hashedPassword,
      updatedAt: new Date().toISOString(),
    }

    // Clean up reset token
    resetTokenStorage.delete(body.token)

    return NextResponse.json({
      message: "Password has been reset successfully. You can now log in with your new password.",
    })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
