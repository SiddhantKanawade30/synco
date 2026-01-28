import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
dotenv.config()

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const jwtSecret = process.env.JWT_SECRET
    
    if (!jwtSecret) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const token = jwt.sign(
      { id: user.id }, 
      jwtSecret,
      { expiresIn: '7d' }
    )

    return NextResponse.json({ token }, { status: 200 })
  } catch (error) {
    console.error("Error generating token:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
