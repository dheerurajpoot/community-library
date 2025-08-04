import { type NextRequest, NextResponse } from "next/server"
import type { User, UpdateProfileRequest } from "@/models"
import { verifyToken } from "@/lib/utils/auth"

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

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization token required" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    const body: UpdateProfileRequest = await request.json()

    // Find user
    const userIndex = users.findIndex((u) => u.id === decoded.userId)
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user profile
    users[userIndex] = {
      ...users[userIndex],
      firstName: body.firstName || users[userIndex].firstName,
      lastName: body.lastName || users[userIndex].lastName,
      phone: body.phone || users[userIndex].phone,
      address: body.address || users[userIndex].address,
      city: body.city || users[userIndex].city,
      state: body.state || users[userIndex].state,
      zipCode: body.zipCode || users[userIndex].zipCode,
      updatedAt: new Date().toISOString(),
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = users[userIndex]

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
