/*
  Warnings:

  - You are about to drop the column `status` on the `Vendors` table. All the data in the column will be lost.
  - Added the required column `active` to the `Vendors` table without a default value. This is not possible if the table is not empty.
  - Made the column `lastname` on table `Vendors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Vendors" DROP COLUMN "status",
ADD COLUMN     "active" BOOLEAN NOT NULL,
ADD COLUMN     "descriptions" TEXT,
ALTER COLUMN "lastname" SET NOT NULL;
