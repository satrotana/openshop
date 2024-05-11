/*
  Warnings:

  - You are about to drop the `Vendors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Vendors";

-- CreateTable
CREATE TABLE "Supplyer" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "business_type" TEXT NOT NULL,
    "descriptions" TEXT,

    CONSTRAINT "Supplyer_pkey" PRIMARY KEY ("id")
);
