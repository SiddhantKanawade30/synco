import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/src/lib/prisma";
import { getUserFromRequest } from "@/src/lib/auth";



export async function DELETE(req: NextRequest, {params} : {params: {projectId: string, memberId: string}}) {
 
    try{

        const user = getUserFromRequest(req);
        if(!user){
            return new Response("Unauthorized", {status: 401});
        }
        
        const project = await prisma.project.findUnique({
            where:{
                id: params.projectId,
            },
            select:{
                ownerId: true,
            }
        })
        
        if(!project){
            return new Response("Project not found", {status: 404});
        }
        
        if(project.ownerId !== user.userId){
            return new Response("Forbidden", {status: 403});
        }

        const deleteMember = await prisma.projectMember.delete({
            where: {
                id: params.memberId
            }
        })

        return NextResponse.json(deleteMember, { 
            status: 200,
            statusText: "Member removed successfully"
        })

    }catch(error){
        console.error("Error removing project member:", error);
        return new Response("Internal Server Error", {status: 500});
    }
    
}

export async function PUT(req: NextRequest, {params} : {params: {projectId: string, memberId: string}}) {
 
    try{
        const user = getUserFromRequest(req);
        if(!user){
            return new Response("Unauthorized", {status: 401});
        }

        const project = await prisma.project.findUnique({
            where:{
                id : params.projectId,
            },
            select:{
                ownerId : true
            }
        })
        
        if(!project){
            return new Response("Project not found", {status: 404});
        }
        
        if(project.ownerId !== user.userId){
            return new Response("Forbidden", {status: 403});
        }
        
        // TODO: Update project member
    }catch(error){
        console.error("Error updating project member:", error);
        return new Response("Internal Server Error", {status: 500});
    }
}
