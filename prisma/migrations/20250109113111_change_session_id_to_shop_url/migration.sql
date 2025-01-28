/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Reel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shop]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shopURL` to the `Reel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reel" DROP CONSTRAINT "Reel_sessionId_fkey";

-- AlterTable
ALTER TABLE "Reel" DROP COLUMN "sessionId",
ADD COLUMN     "shopURL" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Session_shop_key" ON "Session"("shop");

-- AddForeignKey
ALTER TABLE "Reel" ADD CONSTRAINT "Reel_shopURL_fkey" FOREIGN KEY ("shopURL") REFERENCES "Session"("shop") ON DELETE RESTRICT ON UPDATE CASCADE;
