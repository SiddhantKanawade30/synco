import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request){
    const {name, email, password} = await req.json();

    if(!name || !email || !password){
        return new Response("Missing fields", {status: 400})
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    })

    if(existingUser){
        return new Response("User already exists", {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data:{
            name,
            email,
            password: hashedPassword
        }
    })

    return Response.json({id : user.id}, {status: 201});
}