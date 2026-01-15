import {prisma} from "@/src/lib/prisma";
import { getUserFromRequest } from "@/src/lib/auth";

export async function POST(req: Request){
    const auth = getUserFromRequest(req);

    if(!auth || !auth.userId){
        return new Response("Unauthorized - Invalid token", {status: 401});
    }

    const {name} = await req.json();

    console.log("Creating project with user ID:", auth.userId);

    try{
        const project = await prisma.project.create({
            data:{
                name : name,
                ownerId: auth.userId,
                members:{
                    create : {
                        userId : auth.userId,
                        role : "OWNER"
                    }
                }
            }
        })

        return Response.json(project);
    }catch(error){
        console.error("Error creating project:", error);
        return new Response("Internal Server Error", {status: 500});
    }
    
}