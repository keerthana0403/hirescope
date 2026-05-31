"use server";

import pdfParse from "pdf-parse";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function uploadResume(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const file = formData.get("resume") as File;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const parsed = await pdfParse(buffer);

  await prisma.resume.create({
    data: {
      fileName: file.name,
      parsedText: parsed.text,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard/resume");

  return { success: true };
}
