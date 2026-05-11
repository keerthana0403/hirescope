import { z } from "zod";

export const applicationSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  status: z.string(),
  jobDesc: z.string().optional(),
});
