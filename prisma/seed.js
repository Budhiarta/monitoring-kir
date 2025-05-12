import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.device.createMany({
    data: [
      { devicename: "Gas Analyzer" },
      { devicename: "Smoke Tester" },
      { devicename: "Axle Ply Detector" },
      { devicename: "Side Slip" },
      { devicename: "Head Light Tester" },
      { devicename: "Speedometer Tester" },
      { devicename: "Brake & Axle Load Tester" },
    ],
    skipDuplicates: true,
  });
}

main().finally(() => prisma.$disconnect());
