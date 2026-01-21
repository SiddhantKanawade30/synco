import {prisma} from "@/src/lib/prisma";
import { getUserFromRequest } from "@/src/lib/auth";
import { NextRequest } from "next/server";

const MEMBER_TRANSITIONS: Record<string, string[]> = {
  BACKLOG: ["OPEN"],
  OPEN: ["IN_PROGRESS"],
  IN_PROGRESS: ["DONE"],
  DONE: [],
  REJECTED: [],
};

const OWNER_ADMIN_TRANSITIONS: Record<string, string[]> = {
  DONE: ["REJECTED"],
  REJECTED: ["OPEN"],
};

export async function PATCH(req: NextRequest, {params}: {params: Promise<{projectId: string, issueId: string}>}){

    try{
        const {projectId, issueId} = await params;
        const {status} = await req.json();
        
        const user = getUserFromRequest(req);
        if(!user){
            return Response.json({error: "Unauthorized"}, {status: 401});
        }

        const actor = await prisma.user.findUnique({
          where: { id: user.userId },
          select: { name: true },
        });

        const issue = await prisma.issue.findUnique({
            where: {
                id: issueId,
                projectId: projectId
            },
            select: {
                id: true,
                status: true,
                assigneeId: true,
                projectId: true
            }
        })

        if(!issue){
            return Response.json({error: "Issue not found"}, {status: 404});
        }

        const memberShip = await prisma.projectMember.findUnique({
            where: {
                userId_projectId: {
                    userId: user.userId,
                    projectId: issue.projectId
                }
            }
        })

        if(!memberShip){
            return Response.json({error: "Forbidden"}, {status: 403});
        }

        const isManager = memberShip.role === "OWNER" || memberShip.role === "ADMIN";

        if (!isManager) {
            if (issue.assigneeId !== user.userId) {
                return new Response("Can only update assigned issues", {
                status: 403,
                });
            }
        }

        let allowedTransitions = MEMBER_TRANSITIONS[issue.status] || [];
        
        // Add owner/admin transitions
        if (isManager) {
            const ownerTransitions = OWNER_ADMIN_TRANSITIONS[issue.status] || [];
            allowedTransitions = [...allowedTransitions, ...ownerTransitions];
        }

        if (!allowedTransitions.includes(status)) {
            return new Response(
              `Invalid status change from ${issue.status} to ${status}`,
              { status: 403 }
            );
        }

        // Validate status enum
        if(!["BACKLOG", "OPEN", "IN_PROGRESS", "DONE", "REJECTED"].includes(status)) {
          return new Response("Invalid status", { status: 400 });
        }

        // Update issue
        const updatedIssue = await prisma.issue.update({
          where: { id: issue.id },
          data: { status },
        });

        // 🧾 Log activity
        await prisma.activity.create({
          data: {
            // Convention:
            // - status: status transitions
            // - chats: chat messages (future)
            type: "status",
            content: `${actor?.name ?? "Someone"} changed issue status from ${issue.status} to ${status}`,
            issueId: issue.id,  
            userId: user.userId,    
          },
        });

        return Response.json(updatedIssue);
    }catch(error){
        console.error("Error updating issue status:", error);
        return Response.json({error: "Internal server error"}, {status: 500});
    }
}

//     MEMBER:
// BACKLOG → OPEN → IN_PROGRESS → DONE
//                          ❌ cannot reopen

// OWNER / ADMIN:
// DONE → REJECTED → OPEN
//       ↘──────────────↗
