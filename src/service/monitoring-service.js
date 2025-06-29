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
    // Pastikan tanggal diparsing sebagai waktu lokal (jam 00:00)
    const parsedDate = new Date(`${data.Date}T00:00:00`);

    return prismaClient.monitoring.create({
      data: {
        Tester: data.Tester,
        Date: parsedDate,
        MonitoringType: data.MonitoringType,
        Documentation: data.Documentation || "",
        Status: data.Status,
        Sumary: data.Sumary || "",
        Signature: data.Signature || "",
        user: {
          connect: { id: data.userId },
        },
        device: {
          connect: { id: data.deviceId },
        },
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
