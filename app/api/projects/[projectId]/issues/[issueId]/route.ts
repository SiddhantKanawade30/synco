import {prisma} from "@/src/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {getUserFromRequest} from "@/src/lib/auth";

export async function GET(request: NextRequest, { params }: { params: Promise<{ projectId: string, issueId: string }> }) {
    const { projectId, issueId } = await params;
    
    try {

        const user = await getUserFromRequest(request);
        if(!user){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const issue = await prisma.issue.findUnique({
            where: { id: issueId },
            include:{
                assignee: true,
                creator: true,
                activities: true,
            }
        });
        
        if (!issue) {
            return NextResponse.json({ error: "Issue not found" }, { status: 404 });
        }
        
        return NextResponse.json(issue);
    } catch (error) {
        console.error("Error fetching issue:", error);
        return NextResponse.json({ error: "Failed to fetch issue" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params } : { params: Promise<{ projectId: string, issueId: string }> }) {
    try{
        const { projectId, issueId } = await params;
        const user = await getUserFromRequest(request);
        if(!user){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const reAssignData = await request.json();
        
        //check if the person who is editing is owner only 
        const projectOwner = await prisma.project.findUnique({
            where:{
                id: projectId,
                ownerId: user.userId
            }
        })
        
        if(!projectOwner){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        //reassign issue
        const issue = await prisma.issue.update({
            where:{
                id: issueId
            },
            data:{
                assigneeId: reAssignData.assigneeId
            }
        })

        return NextResponse.json(issue);
    }catch(error){
        console.error("Error updating issue:", error);
        return NextResponse.json({ error: "Failed to update issue" }, { status: 500 });
    }
}