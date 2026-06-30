"use server";

import { prisma } from "@/lib/db";
import { applicationSchema } from "@/lib/validations/application";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { ApplicationStatus } from "@prisma/client";
import { analyzeResumeMatch } from "@/lib/ai/analyze-application";
import { generateFollowUpEmail } from "@/lib/ai/generate-email";

export async function createApplication(
  _prevState: unknown,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Unauthorized",
    };
  }

  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const status = formData.get("status") as ApplicationStatus;
  const jobDesc = formData.get("jobDesc") as string;

  const validatedFields = applicationSchema.safeParse({
    company,
    role,
    status,
    jobDesc,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await prisma.application.create({
    data: {
      company: validatedFields.data.company,
      role: validatedFields.data.role,
      status: validatedFields.data.status,
      jobDesc: validatedFields.data.jobDesc,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard");

  return {
    success: true,
  };
}

export async function updateStatus(id: string, status: ApplicationStatus) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.application.updateMany({
    where: {
      id,
      userId: session.user.id,
    },
    data: {
      status,
    },
  });

  revalidatePath("/dashboard");
}

export async function analyzeApplication(applicationId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const application = await prisma.application.findFirst({
    where: {
      id: applicationId,
      userId: session.user.id,
    },
  });

  if (!application) {
    throw new Error("Application not found");
  }

  if (!application.jobDesc) {
    throw new Error("Job description missing");
  }

  const latestResume = await prisma.resume.findFirst({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!latestResume) {
    throw new Error("Please upload a resume first");
  }

  const analysis = await analyzeResumeMatch(
    latestResume.parsedText,
    application.jobDesc,
  );

  await prisma.application.update({
    where: {
      id: applicationId,
    },
    data: {
      matchScore: analysis.matchScore,
      missingSkills: analysis.missingSkills,
      strengths: analysis.strengths,
      suggestions: analysis.suggestions,
      lastAnalyzedAt: new Date(),
    },
  });

  revalidatePath("/dashboard");
}

export async function generateEmail(applicationId: string): Promise<string> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const application = await prisma.application.findFirst({
    where: {
      id: applicationId,
      userId: session.user.id,
    },
  });

  if (!application) throw new Error("Application not found");

  const latestResume = await prisma.resume.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  if (!latestResume) throw new Error("Please upload a resume first");

  const email = await generateFollowUpEmail(
    application.company,
    application.role,
    latestResume.parsedText,
  );

  return email;
}
