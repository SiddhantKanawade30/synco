import { getUserFromRequest } from "@/src/lib/auth";
import {prisma} from "@/src/lib/prisma"
import { NextRequest } from "next/server";


export async function POST(req: NextRequest, { params }: { params: Promise<{ projectId: string }> }){
    try{
		const {title, description, priority, status, assigneeId, deadline} = await req.json();
		console.log("Creating issue with data:", {title, description, priority, status, assigneeId, deadline})

        const user = getUserFromRequest(req);

        if(!user){
            return new Response("Unauthorized", {status: 401});
        }

        const resolvedParams = await params;
        const projectId = resolvedParams.projectId
        console.log("Resolved projectId:", projectId)

        const project = await prisma.project.findUnique({
            where: {
                id: projectId
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

        if(!project){
            return new Response("Project not found", {status: 404});
        }

        const isOwnerOrMember = project.ownerId === user.userId || project.members.some((m: { userId: string }) => m.userId === user.userId)
        if(!isOwnerOrMember){
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
                projectId,
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

        const resolvedParams = await params;
        console.log("GET issues - projectId:", resolvedParams.projectId)

        const { searchParams } = new URL(req.url);
        const filter = searchParams.get("filter") || "all"; // assigned | created | completed | all

        //check if project exists and user is the owner or member
        
        const isOwnerOrMember = await prisma.project.findUnique({
            where: {
                id: resolvedParams.projectId
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
        
        if(isOwnerOrMember.ownerId !== user.userId && !isOwnerOrMember.members.some((member: { userId: string }) => member.userId === user.userId)){
            return new Response("Unauthorized", {status: 401});
        }

        // Base where clause
        let whereClause: any = {
          projectId: resolvedParams.projectId,
        };

        // Apply filter based on current user
        if (filter === "assigned") {
          whereClause.assigneeId = user.userId;
          whereClause.status = { in: ["OPEN", "IN_PROGRESS"] };
        } else if (filter === "created") {
          whereClause.creatorId = user.userId;
          // Show all issues created by user regardless of status
        } else if (filter === "completed") {
          whereClause.OR = [
            { assigneeId: user.userId, status: { in: ["DONE", "REJECTED"] } },
            { creatorId: user.userId, status: { in: ["DONE", "REJECTED"] } }
          ];
        }

        const issues = await prisma.issue.findMany({
          where: whereClause,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            assignee: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            creator: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            project: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        return Response.json(issues);
    }catch(error){
        console.error("Error fetching issues:", error);
        return new Response("Internal Server Error", {status: 500});
    }
}
