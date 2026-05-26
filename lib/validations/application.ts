import { z } from "zod";
import { ApplicationStatus } from "@prisma/client";

export const applicationSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  status: z.nativeEnum(ApplicationStatus),
  jobDesc: z.string().optional(),
});
