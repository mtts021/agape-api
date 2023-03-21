/*
  Warnings:

  - You are about to drop the column `magazinesId` on the `lessons` table. All the data in the column will be lost.
  - Added the required column `magazinesSlug` to the `lessons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_magazinesId_fkey";

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "magazinesId",
ADD COLUMN     "magazinesSlug" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_magazinesSlug_fkey" FOREIGN KEY ("magazinesSlug") REFERENCES "magazines"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
