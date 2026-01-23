import { NextRequest, NextResponse } from "next/server";
import { grok } from "@/app/api/lib/ai/grokClient";

export async function GET() {
  try {
    console.log("Test AI: Starting test");
    
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY not set" }, { status: 500 });
    }
    
    console.log("Test AI: API key found, testing connection...");
    
    const completion = await grok.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: "Respond with 'Hello from Groq!'" }],
      temperature: 0.2,
    });

    const response = completion.choices[0].message.content;
    console.log("Test AI: Response received:", response);

    return NextResponse.json({ 
      success: true, 
      response,
      model: "llama-3.1-8b-instant"
    });
  } catch (error) {
    console.error("Test AI: Error:", error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
