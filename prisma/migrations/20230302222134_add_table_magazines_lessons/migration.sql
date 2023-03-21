-- CreateTable
CREATE TABLE "magazines" (
    "id" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "quarter" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "ageGroup" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "magazines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessons" (
    "id" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "mainText" TEXT NOT NULL,
    "bibleText" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "magazinesId" TEXT NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "magazines_slug_key" ON "magazines"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "lessons_slug_key" ON "lessons"("slug");

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_magazinesId_fkey" FOREIGN KEY ("magazinesId") REFERENCES "magazines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
