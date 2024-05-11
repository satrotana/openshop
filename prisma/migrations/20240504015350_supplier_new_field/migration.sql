/*
  Warnings:

  - You are about to drop the column `business_type` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Supplier` table. All the data in the column will be lost.
  - Added the required column `businessType` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "business_type",
DROP COLUMN "firstname",
DROP COLUMN "lastname",
ADD COLUMN     "businessType" TEXT NOT NULL,
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
