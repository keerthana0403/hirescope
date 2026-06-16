export type ApplicationStatus = "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";

export type Application = {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  createdAt: Date;

  matchScore: number | null;

  missingSkills: string[] | null;
  strengths: string[] | null;
  suggestions: string[] | null;
};
