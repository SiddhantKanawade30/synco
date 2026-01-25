-- AlterTable
ALTER TABLE "Issue" ALTER COLUMN "deadline" SET DEFAULT now() + interval '30 hours';

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "deadline" SET DEFAULT now() + interval '30 days';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;
