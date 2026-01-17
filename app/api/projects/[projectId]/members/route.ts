import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/src/lib/prisma";
import { getUserFromRequest } from "@/src/lib/auth";

export async function GET(req: NextRequest, {params}: {params: {projectId: string}}){
    const auth = getUserFromRequest(req);
    
    if(!auth || !auth.userId){
        return new Response("Unauthorized - Invalid token", {status: 401});
    }
    
    const {projectId} = await params;
    
    try{
        const members = await prisma.projectMember.findMany({
            where: {
                projectId: projectId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                }
            }
        });
        
        return NextResponse.json(members);
    }catch(error){
        console.error("Error fetching project members:", error);
        return new Response("Internal Server Error", {status: 500});
    }
}


export async function POST(req: NextRequest, {params}: {params: {projectId: string}}) {
    
    try{
        const {projectId} = await params;
        const {email, role} = await req.json();

        const user = getUserFromRequest(req);
        
        if(!user || !user.userId){
            return new Response("Unauthorized - Invalid token", {status: 401});
        }

        const membership = await prisma.projectMember.findFirst({
            where : {
                projectId,
                userId: user.userId,
                role: {in : ["OWNER", "ADMIN"]}
            }
        })
        
        if(!membership){
            return NextResponse.json({error: "Unauthorized - You don't have permission to add members"}, {status: 403});
        }

        const userToAdd = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(!userToAdd){
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        const newMember = await prisma.projectMember.create({
            data: {
                projectId: projectId,
                userId: userToAdd.id,
                role: "MEMBER"
            }
        })

        return NextResponse.json(newMember)

    }catch(error){
        console.error("Error adding project member:", error);
        return new Response("Internal Server Error", {status: 500});
    }
}
