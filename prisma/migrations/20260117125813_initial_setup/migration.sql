/*
  Warnings:

  - Added the required column `deadline` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL;
