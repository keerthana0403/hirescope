export function buildMatchPrompt(resumeText: string, jobDescription: string) {
  return `
You are an ATS resume analyzer.

Return ONLY valid JSON.

{
  "matchScore": number,
  "missingSkills": string[],
  "strengths": string[],
  "suggestions": string[]
}

Rules:
- matchScore must be between 0 and 100.
- strengths must contain SHORT skill names only.
- missingSkills must contain SHORT skill names only.
- suggestions must be concise and actionable.
- Maximum 5 strengths.
- Maximum 5 missing skills.
- Maximum 5 suggestions.
- Do NOT explain anything.
- Do NOT write sentences inside strengths.
- Do NOT write paragraphs.

Example:

{
  "matchScore": 82,
  "missingSkills": ["Redux", "Jest"],
  "strengths": ["React", "TypeScript", "REST APIs"],
  "suggestions": [
    "Add Redux project experience",
    "Highlight testing experience"
  ]
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;
}
