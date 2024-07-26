/*
  Warnings:

  - Made the column `name` on table `animals` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "animals" ALTER COLUMN "name" SET NOT NULL;
