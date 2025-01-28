-- CreateTable
CREATE TABLE "ProductReel" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "reelId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductReel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reel" ADD CONSTRAINT "Reel_shopURL_fkey" FOREIGN KEY ("shopURL") REFERENCES "Session"("shop") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReel" ADD CONSTRAINT "ProductReel_reelId_fkey" FOREIGN KEY ("reelId") REFERENCES "Reel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
