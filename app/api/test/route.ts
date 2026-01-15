import { prisma } from "@/src/lib/prisma";

export async function GET(req: Request){
    const users = await prisma.user.findMany();
    return Response.json(users);
}