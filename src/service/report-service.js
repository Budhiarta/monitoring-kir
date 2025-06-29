import { prismaClient } from "../application/database.js";

const reportService = {
  createReport: async (data) => {
    const {
      tester,
      Date: rawDate,
      devicename,
      Documentation,
      Signature,
    } = data;

    // Validasi dan parsing tanggal
    const parsedDate = new Date(rawDate);
    if (isNaN(parsedDate.getTime())) {
      throw new Error(`Format tanggal tidak valid: ${rawDate}`);
    }

    // Cari device berdasarkan nama
    const device = await prismaClient.device.findFirst({
      where: { devicename },
    });

    if (!device) {
      throw new Error(`Device '${devicename}' tidak ditemukan`);
    }

    // Buat report
    return prismaClient.report.create({
      data: {
        tester,
        Date: parsedDate,
        deviceId: device.id,
        Documentation: Documentation || "Tidak ada dokumentasi",
        Signature: Signature || "Tanda tangan kosong",
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
