"use server";

import { prisma } from "@/lib/db";
import { applicationSchema } from "@/lib/validations/application";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { ApplicationStatus } from "@prisma/client";

export async function createApplication(_prevState: unknown, formData: FormData) {
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
  await prisma.application.update({
    where: { id },
    data: { status },
  });
}
