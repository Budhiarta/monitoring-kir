-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "tester" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "Documentation" TEXT NOT NULL,
    "Signature" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
