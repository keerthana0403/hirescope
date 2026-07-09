/*
  Warnings:

  - The `missingSkills` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `strengths` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `suggestions` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "missingSkills",
ADD COLUMN     "missingSkills" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "strengths",
ADD COLUMN     "strengths" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "suggestions",
ADD COLUMN     "suggestions" TEXT[] DEFAULT ARRAY[]::TEXT[];
