import Groq from "groq-sdk";

export const grok = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});
