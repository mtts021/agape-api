/*
  Warnings:

  - Added the required column `descriptionTheme` to the `magazines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme` to the `magazines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "magazines" ADD COLUMN     "descriptionTheme" TEXT NOT NULL,
ADD COLUMN     "theme" TEXT NOT NULL;
