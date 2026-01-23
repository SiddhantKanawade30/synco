import { grok } from "./grokClient";

export type AISuggestedIssue = {
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  estimatedHours: number;
};

export async function analyzeIssueText(text: string): Promise<AISuggestedIssue> {
  try {
    console.log("analyzeIssueText: Starting analysis for text:", text);
    
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY environment variable is not set");
    }
    
    const prompt = `
You are an AI assistant for a project management system.

From the following user text, extract:
- title (short, clear)
- description (1-2 lines)
- priority (LOW, MEDIUM, HIGH)
- estimatedHours (number, realistic)

User text:
"${text}"

Respond ONLY in strict JSON like:
{
  "title": "...",
  "description": "...",
  "priority": "HIGH",
  "estimatedHours": 24
}
`;
    
    console.log("analyzeIssueText: API key found, creating completion...");
    
    const completion = await grok.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    console.log("analyzeIssueText: Completion created");

    const raw = completion.choices[0].message.content;
    console.log("analyzeIssueText: Raw response:", raw);

    if (!raw) {
      throw new Error("Empty AI response");
    }

    // Clean the response to ensure it's valid JSON
    const cleanedResponse = raw.trim().replace(/```json\n?|\n?```/g, '');
    console.log("analyzeIssueText: Cleaned response:", cleanedResponse);

    const parsed = JSON.parse(cleanedResponse);
    console.log("analyzeIssueText: Parsed result:", parsed);
    
    return parsed;
  } catch (error) {
    console.error("analyzeIssueText: Error during analysis:", error);
    
    if (error instanceof Error) {
      // If it's a JSON parse error, provide more context
      if (error.message.includes('Unexpected token')) {
        throw new Error(`Invalid JSON response from AI: ${error.message}`);
      }
      throw error;
    }
    
    throw new Error("Unknown error during AI analysis");
  }
}
