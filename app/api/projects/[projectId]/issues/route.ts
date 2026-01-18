import { getUserFromRequest } from "@/src/lib/auth";
import {prisma} from "@/src/lib/prisma"
import { NextRequest } from "next/server";


export async function POST(req: NextRequest, { params }: { params: Promise<{ projectId: string }> }){
    const {title, description, priority, status, assigneeId, deadline} = await req.json();
    
    try{

        const user = getUserFromRequest(req);

        if(!user){
            return new Response("Unauthorized", {status: 401});
        }

        const project = await prisma.project.findUnique({
            where: {
                id: (await params).projectId
            },
            select: {
                id: true,
                ownerId: true
            }
        });

        if(!project){
            return new Response("Project not found", {status: 404});
        }

        if(project.ownerId !== user.userId){
            return new Response("Unauthorized", {status: 401});
        }

        const issue = await prisma.issue.create({
            data:{
                title,
                description,
                priority: priority || "LOW",
                status: status || "OPEN",
                assigneeId,
                deadline: deadline ? new Date(deadline) : new Date(),
                projectId: (await params).projectId,
                creatorId: user.userId
            }
        })
        
        return Response.json(issue);
    }catch(error){
        console.error("Error creating issue:", error);
        return new Response("Internal Server Error", {status: 500});
    }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ projectId: string }> }){
    try{
        const user = getUserFromRequest(req);
        
        if(!user){
            return new Response("Unauthorized", {status: 401});
        }

        //check if project exists and user is the owner or member
        
        const isOwnerOrMember = await prisma.project.findUnique({
            where: {
                id: (await params).projectId
            },
            select: {
                ownerId: true,
                members: {
                    select: {
                        userId: true
                    }
                }
            }
        });
        
        if(!isOwnerOrMember){
            return new Response("Project not found", {status: 404});
        }
        
        if(isOwnerOrMember.ownerId !== user.userId && !isOwnerOrMember.members.some(member => member.userId === user.userId)){
            return new Response("Unauthorized", {status: 401});
        }
        
        const issues = await prisma.issue.findMany({
            where: {
                projectId: (await params).projectId
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        
        return Response.json(issues);
    }catch(error){
        console.error("Error fetching issues:", error);
        return new Response("Internal Server Error", {status: 500});
    }
}
