-- AlterTable
ALTER TABLE "PersonalChat" ADD COLUMN     "imageUrl" TEXT,
ALTER COLUMN "textMessage" DROP NOT NULL;
