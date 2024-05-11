-- CreateEnum
CREATE TYPE "gender" AS ENUM ('MAIL', 'FEMALE');

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "gender" "gender" NOT NULL DEFAULT 'FEMALE';
