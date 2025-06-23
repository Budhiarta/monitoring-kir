-- CreateTable
CREATE TABLE "SparePart" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,

    CONSTRAINT "SparePart_pkey" PRIMARY KEY ("id")
);
