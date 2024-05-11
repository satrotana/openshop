-- CreateTable
CREATE TABLE "Vendors" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT,
    "status" BOOLEAN NOT NULL,
    "business_type" TEXT NOT NULL,

    CONSTRAINT "Vendors_pkey" PRIMARY KEY ("id")
);
