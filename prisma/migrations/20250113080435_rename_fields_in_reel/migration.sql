/*
  Warnings:

  - You are about to drop the column `size` on the `Reel` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Reel` table. All the data in the column will be lost.
  - Added the required column `reelSize` to the `Reel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reelURL` to the `Reel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reel" DROP COLUMN "size",
DROP COLUMN "url",
ADD COLUMN     "reelSize" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "reelURL" TEXT NOT NULL;
