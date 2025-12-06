/*
  Warnings:

  - Added the required column `nextPaymentDate` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "subscriptions_startDate_idx";

-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "nextPaymentDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "subscriptions_userId_idx" ON "subscriptions"("userId");

-- CreateIndex
CREATE INDEX "subscriptions_nextPaymentDate_idx" ON "subscriptions"("nextPaymentDate");
