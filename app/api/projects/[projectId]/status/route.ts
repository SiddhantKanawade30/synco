import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

const allowedStatuses = ["ACTIVE", "ON_HOLD", "COMPLETED", "CANCELLED"];

export async function PUT(request: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = await params;
    const { status } = await request.json();
    
    if (!allowedStatuses.includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    
    try {
        const project = await prisma.project.update({
            where: { id: projectId },
            data: {
                status: status as any,
            },
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