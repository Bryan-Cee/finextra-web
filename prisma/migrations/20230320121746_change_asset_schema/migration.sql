/*
  Warnings:

  - You are about to drop the column `value` on the `Asset` table. All the data in the column will be lost.
  - Added the required column `description` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "value",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "unitPrice" DOUBLE PRECISION NOT NULL;
