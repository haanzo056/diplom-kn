-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "pageId" TEXT;

-- CreateIndex
CREATE INDEX "Post_pageId_idx" ON "Post"("pageId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
