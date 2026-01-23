import { NextRequest, NextResponse } from "next/server";
import { analyzeIssueText } from "@/app/api/lib/ai/issueAssistant";
import { getUserFromRequest } from "@/src/lib/auth";

export async function POST(req: NextRequest) {
  try {
    console.log("AI Issue Assistant: Request received");
    
    const user = getUserFromRequest(req);
    if (!user) {
      console.log("AI Issue Assistant: Unauthorized");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { text, projectId } = await req.json();
    console.log("AI Issue Assistant: Request data:", { text, projectId });

    if (!text || !projectId) {
      console.log("AI Issue Assistant: Missing data", { text: !!text, projectId: !!projectId });
      return new NextResponse("Missing text or projectId", { status: 400 });
    }

    console.log("AI Issue Assistant: Calling AI analysis...");
    const aiResult = await analyzeIssueText(text);
    console.log("AI Issue Assistant: AI result:", aiResult);

    // Convert estimatedHours → deadline
    const deadline = new Date();
    deadline.setHours(deadline.getHours() + aiResult.estimatedHours);

    return NextResponse.json({
      title: aiResult.title,
      description: aiResult.description,
      priority: aiResult.priority,
      suggestedDeadline: deadline,
    });
  } catch (error) {
    console.error("AI Issue Assistant Error:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : 'No stack trace');
    return new NextResponse(`AI processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}
