import {prisma} from "@/src/lib/prisma";
import { getUserFromRequest } from "@/src/lib/auth";
import { sendEmail } from "@/app/api/lib/email";
import { userAddedToProjectEmail } from "@/app/api/lib/emailTemplets/userAddedToProject";

export async function POST(req: Request){
    const auth = getUserFromRequest(req);

    if(!auth || !auth.userId){
        return new Response("Unauthorized - Invalid token", {status: 401});
    }

    const {name, deadline, members} = await req.json();
    
    console.log("Creating project with data:", {name, deadline, members, userId: auth.userId});

    try{
        // Create the project first
        const project = await prisma.project.create({
            data:{
                name : name,
                deadline: new Date(deadline),
                ownerId: auth.userId,
                members:{
                    create : {
                        userId : auth.userId,
                        role : "OWNER"
                    }
                }
            },
            include: {
                members: {
                    include: {
                        user: true
                    }
                }
            }
        })

        // Add additional members if provided
        if (members && members.length > 0) {
            for (const email of members) {
                try {
                    const userToAdd = await prisma.user.findUnique({
                        where: {
                            email: email.trim()
                        }
                    })

                    if (userToAdd) {
                        await prisma.projectMember.create({
                            data: {
                                projectId: project.id,
                                userId: userToAdd.id,
                                role: "MEMBER"
                            }
                        })
                        console.log(`Added member ${email} to project ${project.id}`)
                        
                        // Send email notification
                        try {
                            console.log("Preparing to send email to:", userToAdd.email);
                            console.log("Project name:", project.name);
                            
                            // Get the name of the user who is creating the project
                            const creatingUser = await prisma.user.findUnique({
                                where: {
                                    id: auth.userId
                                },
                                select: {
                                    name: true
                                }
                            })
                            
                            const { subject, html } = userAddedToProjectEmail({
                                projectName: project.name,
                                projectId: project.id,
                                addedByName: creatingUser?.name || "A team member",
                                projectDeadline: project.deadline ? new Date(project.deadline).toLocaleDateString() : undefined,
                            });

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
                    } else {
                        console.log(`User not found for email: ${email}`)
                    }
                } catch (error) {
                    console.error(`Error adding member ${email}:`, error)
                }
            }

            // Refetch project with all members
            const updatedProject = await prisma.project.findUnique({
                where: { id: project.id },
                include: {
                    members: {
                        include: {
                            user: true
                        }
                    }
                }
            })

            console.log("Project created successfully with members:", updatedProject);
            return Response.json({
                id: updatedProject!.id,
                name: updatedProject!.name,
                deadline: updatedProject!.deadline.toISOString(),
                createdAt: updatedProject!.createdAt.toISOString(),
                members: updatedProject!.members
            });
        }

        console.log("Project created successfully:", project);
        return Response.json({
            id: project.id,
            name: project.name,
            deadline: project.deadline.toISOString(),
            createdAt: project.createdAt.toISOString(),
            members: project.members
        });
    }catch(error){
        console.error("Error creating project:", error);
        return new Response(JSON.stringify({error: "Failed to create project"}), {status: 500});
    }
    
}

export async function GET(request: Request) {
    const auth = getUserFromRequest(request);

    if(!auth || !auth.userId){
        return new Response("Unauthorized - Invalid token", {status: 401});
    }

    try{
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        const projects = await prisma.project.findMany({
            where: {
                OR: [
                    { ownerId: auth.userId },
                    { members: { some: { userId: auth.userId } } }
                ]
            },
            include: {
                members: {
                    include: {
                        user: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip,
            take: limit,
        });

        const total = await prisma.project.count({
            where: {
                OR: [
                    { ownerId: auth.userId },
                    { members: { some: { userId: auth.userId } } }
                ]
            },
        });

        return Response.json({
            projects,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasMore: skip + limit < total
            }
        });
    }catch(error){
        console.error("Error fetching projects:", error);
        return new Response("Internal Server Error", {status: 500});
    }
}