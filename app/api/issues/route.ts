import {prisma} from "@/src/lib/prisma";
import { getUserFromRequest } from "@/src/lib/auth";

export async function POST({req}: {req: Request;}){
    const {title, description, projectId, assigneeId, deadline} = await req.json();
    const user = getUserFromRequest(req)

    const issue = prisma.issue.create({
        data:{
            title,
            description,
            creatorId : user?.userId!,
            projectId : projectId!,
            status : "OPEN",
            priority : "LOW",
            assigneeId : assigneeId!,
            deadline : deadline || null
        }
    })

    return Response.json(issue);
}

export async function GET({req}: {req: Request;}){
    try{
        const user = getUserFromRequest(req)
        if(!user){
            new Response("Unauthorized - Invalid token", {status: 401});
        }
        const issues = prisma.issue.findMany({
            where:{
                assigneeId: user?.userId
            }
        })
        return Response.json(issues);
    } catch (error) {
        console.error("Error fetching issues:", error);
        return Response.json({ error: "Failed to fetch issues" }, { status: 500 });
    }
}
