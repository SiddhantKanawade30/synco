-- AlterTable
ALTER TABLE "Issue" ALTER COLUMN "deadline" SET DEFAULT now() + interval '30 hours';

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL DEFAULT now() + interval '30 days';
