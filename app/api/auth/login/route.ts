import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import * as dotenv  from "dotenv";
dotenv.config();

export async function POST(req: Request){
    const {email, password} = await req.json();

    const existingUser = await prisma.user.findUnique({
        where:{email}
    })

    if(!existingUser){
        return Response.json({error: "User not found"}, {status: 404})
    }
    //@ts-ignore
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordValid){
        return Response.json({error: "Invalid password"}, {status: 401})
    }

    const jwtSecret = process.env.JWT_SECRET;
    
    if (!jwtSecret) {
        return Response.json({error: "Server configuration error"}, {status: 500})
    }

    const token = jwt.sign({id: existingUser.id}, jwtSecret)

    return Response.json({token}, {status: 200})
}