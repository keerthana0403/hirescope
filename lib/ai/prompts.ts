export function buildMatchPrompt(resumeText: string, jobDescription: string) {
  return `
You are an expert technical recruiter.

Analyze the candidate resume against the job description.

Return ONLY valid JSON.

{
  "matchScore": number,
  "missingSkills": [],
  "strengths": [],
  "suggestions": []
}

Rules:
- matchScore must be between 0 and 100.
- missingSkills should contain important missing skills.
- strengths should contain matching skills.
- suggestions should improve ATS compatibility.

Resume:
${resumeText}

Job Description:
${jobDescription}
`;
}
