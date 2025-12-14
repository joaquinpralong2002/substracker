/*
  Warnings:

  - You are about to drop the column `billingCycle` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `nextPaymentDate` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `reminderDays` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `next_payment_date` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_userId_fkey";

-- DropIndex
DROP INDEX "subscriptions_nextPaymentDate_idx";

-- DropIndex
DROP INDEX "subscriptions_userId_idx";

-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "billingCycle",
DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "nextPaymentDate",
DROP COLUMN "reminderDays",
DROP COLUMN "startDate",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "billing_cycle" "billing_cycles" NOT NULL DEFAULT 'Mensual',
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "next_payment_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "reminder_days" INTEGER NOT NULL DEFAULT 7,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "subscriptions_user_id_idx" ON "subscriptions"("user_id");

-- CreateIndex
CREATE INDEX "subscriptions_next_payment_date_idx" ON "subscriptions"("next_payment_date");

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
