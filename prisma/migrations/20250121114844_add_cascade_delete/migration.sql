-- DropForeignKey
ALTER TABLE "ProductReel" DROP CONSTRAINT "ProductReel_reelId_fkey";

-- AddForeignKey
ALTER TABLE "ProductReel" ADD CONSTRAINT "ProductReel_reelId_fkey" FOREIGN KEY ("reelId") REFERENCES "Reel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
