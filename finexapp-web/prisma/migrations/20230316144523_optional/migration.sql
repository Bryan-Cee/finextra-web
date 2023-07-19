/*
  Warnings:

  - Made the column `userId` on table `FundAccount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Loan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Transaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "FundAccount" DROP CONSTRAINT "FundAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "FundAccount" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Loan" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundAccount" ADD CONSTRAINT "FundAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
