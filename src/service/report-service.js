import { prismaClient } from "../application/database.js";

const reportService = {
  createReport: async (data) => {
    const { tester, date, devicename, Documentation, Signature } = data; // ✅ Ubah 'Date' jadi 'date'
    const parsedDate = new Date(date); // ✅ Sekarang aman

    console.log("Parsed date:", parsedDate);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Format tanggal tidak valid");
    }

    const device = await prismaClient.device.findFirst({
      where: { devicename: devicename },
    });

    if (!device) {
      throw new Error(`Device '${devicename}' tidak ditemukan`);
    }

    return prismaClient.report.create({
      data: {
        tester,
        Date: parsedDate,
        deviceId: device.id,
        Documentation,
        Signature,
      },
    });
  },

  getAllReport: async () => {
    const reports = await prismaClient.report.findMany({
      include: {
        device: {
          select: {
            devicename: true,
          },
        },
      },
      orderBy: {
        Date: "desc",
      },
    });

    return reports.map((r) => ({
      id: r.id,
      tester: r.tester,
      Date: r.Date,
      devicename: r.device.devicename, // ✅ perbaiki di sini
      Documentation: r.Documentation,
      Signature: r.Signature,
    }));
  },
};

export default reportService;
