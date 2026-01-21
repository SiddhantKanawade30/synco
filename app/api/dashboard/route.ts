import { getUserFromRequest } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"
import { NextResponse, NextRequest } from "next/server"


export async function GET(req: NextRequest){
    try{
        const user = getUserFromRequest(req)
        if(!user || !user.userId){
            return new Response("Unauthorized - Invalid token", {status: 401});
        }

        const [taskAssigned, taskCompleted, totalProjects, openIssues] = await Promise.all([
            prisma.issue.count({
                where:{
                    assigneeId: user.userId,
                }
            }),
            prisma.issue.count({
                where:{
                    assigneeId: user.userId,
                    status : "DONE"
                }
            }),
            prisma.project.count({
                where:{
                    members:{
                        some:{
                            userId: user.userId
                        }
                    }
                }
            }),
            prisma.issue.count({
                where:{
                    assigneeId: user.userId,
                    status: {
                        in: ["OPEN", "BACKLOG", "IN_PROGRESS"]
                    }
                }
            })
        ])
        
        return NextResponse.json({
            openIssues,
            taskCompleted,
            taskAssigned,
            totalProjects,
            
        })
    }catch{
        return new Response("Internal Server Error", {status: 500});
    }
}