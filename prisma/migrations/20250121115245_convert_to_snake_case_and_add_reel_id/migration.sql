/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ProductReel` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `ProductReel` table. All the data in the column will be lost.
  - You are about to drop the column `reelId` on the `ProductReel` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProductReel` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Reel` table. All the data in the column will be lost.
  - You are about to drop the column `fileName` on the `Reel` table. All the data in the column will be lost.
  - You are about to drop the column `reelSize` on the `Reel` table. All the data in the column will be lost.
  - You are about to drop the column `reelURL` on the `Reel` table. All the data in the column will be lost.
  - You are about to drop the column `shopURL` on the `Reel` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Reel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reel_id]` on the table `Reel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `ProductReel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reel_id` to the `ProductReel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ProductReel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_name` to the `Reel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reel_id` to the `Reel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reel_size` to the `Reel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reel_url` to the `Reel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shop_url` to the `Reel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Reel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductReel" DROP CONSTRAINT "ProductReel_reelId_fkey";

-- DropForeignKey
ALTER TABLE "Reel" DROP CONSTRAINT "Reel_shopURL_fkey";

-- AlterTable
ALTER TABLE "ProductReel" DROP COLUMN "createdAt",
DROP COLUMN "productId",
DROP COLUMN "reelId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "reel_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Reel" DROP COLUMN "createdAt",
DROP COLUMN "fileName",
DROP COLUMN "reelSize",
DROP COLUMN "reelURL",
DROP COLUMN "shopURL",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "file_name" TEXT NOT NULL,
ADD COLUMN     "reel_id" TEXT NOT NULL,
ADD COLUMN     "reel_size" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "reel_url" TEXT NOT NULL,
ADD COLUMN     "shop_url" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reel_reel_id_key" ON "Reel"("reel_id");

-- AddForeignKey
ALTER TABLE "Reel" ADD CONSTRAINT "Reel_shop_url_fkey" FOREIGN KEY ("shop_url") REFERENCES "Session"("shop") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReel" ADD CONSTRAINT "ProductReel_reel_id_fkey" FOREIGN KEY ("reel_id") REFERENCES "Reel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
