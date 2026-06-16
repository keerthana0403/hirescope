/*
  Warnings:

  - Added the required column `updatedAt` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "lastAnalyzedAt" TIMESTAMP(3),
ADD COLUMN     "matchScore" INTEGER,
ADD COLUMN     "missingSkills" JSONB,
ADD COLUMN     "strengths" JSONB,
ADD COLUMN     "suggestions" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
