import { ai } from "./gemini";
import { buildMatchPrompt } from "./prompts";
import { ApplicationAnalysis } from "@/types/application-analysis";

export async function analyzeResumeMatch(
  resumeText: string,
  jobDescription: string,
): Promise<ApplicationAnalysis> {
  const prompt = buildMatchPrompt(resumeText, jobDescription);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text ?? "";

  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleanedText);
  } catch {
    throw new Error("Invalid AI response");
  }
}
