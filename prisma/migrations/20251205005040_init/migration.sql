/*
  Warnings:

  - Changed the type of `currency` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `billingCycle` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD', 'ARS');

-- CreateEnum
CREATE TYPE "BillingCycle" AS ENUM ('Mensual', 'Trimestral', 'Semestral', 'Anual');

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL,
DROP COLUMN "billingCycle",
ADD COLUMN     "billingCycle" "BillingCycle" NOT NULL,
ALTER COLUMN "reminderDays" SET DEFAULT 7;
