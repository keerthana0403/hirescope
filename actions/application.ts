"use server";

import { prisma } from "@/lib/db";
import { applicationSchema } from "@/lib/validations/application";
import { revalidatePath } from "next/cache";

export async function createApplication(prevState: any, formData: FormData) {
  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const status = formData.get("status") as string;
  const jobDesc = formData.get("jobDesc") as string;

  const validatedFields = applicationSchema.safeParse({
    company,
    role,
    status,
    jobDesc,
  });
  // ❌ Validation failed
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // ✅ Save to DB
  await prisma.application.create({
    data: validatedFields.data,
  });

  revalidatePath("/dashboard");

  return {
    success: true,
  };
}

export async function updateStatus(id: string, status: string) {
  await prisma.application.update({
    where: { id },
    data: { status },
  });
}
