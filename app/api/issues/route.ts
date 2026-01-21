import { NextRequest, NextResponse } from 'next/server'
import {prisma} from "@/src/lib/prisma";
import { getUserFromRequest } from "@/src/lib/auth";

export async function POST(request: NextRequest){
    try {
        const {title, description, projectId, assigneeId, deadline} = await request.json();
        const user = getUserFromRequest(request)

        const issue = await prisma.issue.create({
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

        return NextResponse.json(issue);
    } catch (error) {
        console.error("Error creating issue:", error);
        return NextResponse.json({ error: "Failed to create issue" }, { status: 500 });
    }
}

export async function GET(request: NextRequest){
    try{
        const user = getUserFromRequest(request)
        if(!user){
            return new NextResponse("Unauthorized - Invalid token", {status: 401});
        }
        const issues = await prisma.issue.findMany({
            where:{
                assigneeId: user?.userId
            }
        })
        return NextResponse.json(issues);
    } catch (error) {
        console.error("Error fetching issues:", error);
        return NextResponse.json({ error: "Failed to fetch issues" }, { status: 500 });
    }
}
