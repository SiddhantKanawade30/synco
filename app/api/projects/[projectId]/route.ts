import {prisma} from "@/src/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
    const resolvedParams = await params;
    const { projectId } = resolvedParams;
    
    try {
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include:{
                members: true,
                issues: true,
            }
        });
        
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        
        return NextResponse.json(project);
    } catch (error) {
        console.error("Error fetching project:", error);
        return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
    }
}


