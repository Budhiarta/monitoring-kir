import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const monitoringService = {
  getMonitoringById: async (id) => {
    return await prismaClient.monitoring.findUnique({
      where: { id: parseInt(id) },
      include: { user: true, device: true }, // PERBAIKI INI
    });
  },

  getAllMonitorings: async () => {
    return prismaClient.monitoring.findMany({
      include: { user: true, device: true },
    });
  },

  createMonitoring: async (data) => {
    // Ambil hanya tanggal dan buat waktu lokal jam 00:00
    const [year, month, day] = data.Date.split("-").map(Number);
    const localDate = new Date(year, month - 1, day); // bulan dimulai dari 0

    return prismaClient.monitoring.create({
      data: {
        Tester: data.Tester,
        Date: localDate, // disimpan aman jam 00:00 lokal
        MonitoringType: data.MonitoringType,
        Documentation: data.Documentation || "",
        Status: data.Status,
        Sumary: data.Sumary || "",
        Signature: data.Signature || "",
        user: { connect: { id: data.userId } },
        device: { connect: { id: data.deviceId } },
      },
    });
  },

  updateMonitoring: async (id, data) => {
    return prismaClient.monitoring.update({
      where: { id },
      data: {
        Tester: data.Tester,
        Date: new Date(data.Date),
        MonitoringType: data.MonitoringType,
        Documentation: data.Documentation,
        Status: data.Status,
        Sumary: data.Sumary,
        Signature: data.Signature,
        user: data.userId ? { connect: { id: data.userId } } : undefined,
        device: data.deviceId ? { connect: { id: data.deviceId } } : undefined,
      },
    });
  },

  deleteMonitoring: async (id) => {
    return prismaClient.monitoring.delete({
      where: { id },
    });
  },
};

export default monitoringService;
