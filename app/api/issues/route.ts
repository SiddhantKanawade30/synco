import {prisma} from "@/src/lib/prisma";
import { getUserFromRequest } from "@/src/lib/auth";

export async function POST({req}: {req: Request;}){
    const {title, description, projectId, assigneeId} = await req.json();
    const user = getUserFromRequest(req)

    const issue = prisma.issue.create({
        data:{
            title,
            description,
            creatorId : user?.userId!,
            projectId : projectId!,
            status : "OPEN",
            priority : "LOW",
            assigneeId : assigneeId!
        }
    })

    return Response.json(issue);
}