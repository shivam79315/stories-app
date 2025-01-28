/*
  Warnings:

  - You are about to drop the column `shopId` on the `Reel` table. All the data in the column will be lost.
  - Added the required column `fileCreateId` to the `Reel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reel" DROP COLUMN "shopId",
ADD COLUMN     "fileCreateId" TEXT NOT NULL;
