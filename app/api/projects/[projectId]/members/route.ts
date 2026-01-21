import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/src/lib/prisma";
import { getUserFromRequest } from "@/src/lib/auth";
import { sendEmail } from "@/app/api/lib/email";
import { userAddedToProjectEmail } from "@/app/api/lib/emailTemplets/userAddedToProject";

export async function GET(req: NextRequest, {params}: {params: Promise<{projectId: string}>}){
    const auth = getUserFromRequest(req);
    
    if(!auth || !auth.userId){
        return new Response("Unauthorized - Invalid token", {status: 401});
    }
    
    const {projectId} = await params;
    
    try{
        const members = await prisma.projectMember.findMany({
            where: {
                projectId: projectId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                }
            }
        });
        
        return NextResponse.json(members);
    }catch(error){
        console.error("Error fetching project members:", error);
        return new Response("Internal Server Error", {status: 500});
    }
}


export async function POST(req: NextRequest, {params}: {params: Promise<{projectId: string}>}) {
    
    try{
        const {projectId} = await params;
        const {email, role} = await req.json();

        const user = getUserFromRequest(req);
        
        if(!user || !user.userId){
            return new Response("Unauthorized - Invalid token", {status: 401});
        }

        const membership = await prisma.projectMember.findFirst({
            where : {
                projectId,
                userId: user.userId,
                role: {in : ["OWNER", "ADMIN"]}
            }
        })
        
        if(!membership){
            return NextResponse.json({error: "Unauthorized - You don't have permission to add members"}, {status: 403});
        }

        const userToAdd = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(!userToAdd){
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        // Get project details for email
        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            },
            select: {
                name: true,
                id: true
            }
        })

        if(!project){
            return NextResponse.json({error: "Project not found"}, {status: 404});
        }

        // Get the name of the user who is adding the member
        const addingUser = await prisma.user.findUnique({
            where: {
                id: user.userId
            },
            select: {
                name: true
            }
        })

        const newMember = await prisma.projectMember.create({
            data: {
                projectId: projectId,
                userId: userToAdd.id,
                role: "MEMBER"
            }
        })

        // Send email notification
        try {
            console.log("Preparing to send email to:", userToAdd.email);
            console.log("Project name:", project.name);
            console.log("Added by:", addingUser?.name || "A team member");
            
            const { subject, html } = userAddedToProjectEmail({
                projectName: project.name,
                projectId: project.id,
                addedByName: addingUser?.name || "A team member",
            });

            console.log("Email template created, sending...");
            await sendEmail({
                to: userToAdd.email,
                subject,
                html,
            });

            console.log(`Email sent to ${userToAdd.email} for project ${project.name}`);
        } catch (emailError) {
            console.error("Error sending email notification:", emailError);
            // Don't fail the request if email fails, but log it
        }

        return NextResponse.json(newMember)

    }catch(error){
        console.error("Error adding project member:", error);
        return new Response("Internal Server Error", {status: 500});
    }
}
