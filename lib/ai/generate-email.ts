import { ai } from "./gemini";

export async function generateFollowUpEmail(
  company: string,
  role: string,
  resumeText: string,
): Promise<string> {
  const prompt = `
You are a professional job application assistant.
Write a short, professional follow-up email for a job application.

Company: ${company}
Role: ${role}
Candidate background (from resume): ${resumeText.slice(0, 1000)}

Rules:
- Max 150 words
- Professional but warm tone
- Do NOT include subject line
- Do NOT use placeholder brackets like [Your Name]
- End with "Best regards," and a new line (the app will add the name)
- Return ONLY the email body, nothing else
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text?.trim() ?? "";
}
