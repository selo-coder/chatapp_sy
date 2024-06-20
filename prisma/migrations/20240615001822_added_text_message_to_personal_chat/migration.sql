/*
  Warnings:

  - Added the required column `textMessage` to the `PersonalChat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PersonalChat" ADD COLUMN     "textMessage" TEXT NOT NULL;
