-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_magazinesSlug_fkey";

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_magazinesSlug_fkey" FOREIGN KEY ("magazinesSlug") REFERENCES "magazines"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
