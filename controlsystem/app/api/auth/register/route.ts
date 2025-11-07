// Registration endpoint
import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"
import { hashPassword } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, phone, password, confirmPassword, role } = await request.json()

    // Validation
    if (!fullName || !email || !phone || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    const db = await getDatabase()

    // Check if user exists
    const existingUser = await db.collection("users").findOne({
      $or: [{ email }, { phone }],
    })

    if (existingUser) {
      return NextResponse.json({ error: "Email or phone already exists" }, { status: 409 })
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password)

    const result = await db.collection("users").insertOne({
      fullName,
      email,
      phone,
      password: hashedPassword,
      role: role || "Staff",
      createdAt: new Date(),
    })

    return NextResponse.json({ message: "User created successfully", userId: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
