import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No authorization token" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    
    // For now, we'll use a simple approach to get the user from the session
    // In a real app, you'd decode the JWT token
    const email = token // This is a simplified approach - you'd normally decode the JWT
    
    if (!email) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ 
      message: "User found in database",
      user 
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
