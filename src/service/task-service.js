import { prismaClient } from "../application/database.js";

const taskService = {
  createIsCheckedTask: async ({ taskId, monitoringId, checked }) => {
    const monitoring = await prismaClient.monitoring.findUnique({
      where: { id: monitoringId },
    });
    if (!monitoring) {
      throw new Error("Monitoring ID tidak ditemukan");
    }

    // Cek apakah taskId valid
    const task = await prismaClient.task.findUnique({ where: { id: taskId } });
    if (!task) {
      throw new Error("Task ID tidak ditemukan");
    }

    // Simpan CheckedTask
    return await prismaClient.checkedTask.create({
      data: {
        taskId,
        monitoringId,
        checked,
      },
      include: {
        task: true,
        monitoring: true,
      },
    });
  },

  getTaskByDeviceId: async (id) => {
    return await prismaClient.task.findMany({
      where: { deviceId: parseInt(id) },
    });
  },

  getTaskByDeviceIdFrequency: async (deviceId, frequency) => {
    const id = parseInt(deviceId);
    const freq = parseInt(frequency);

    if (isNaN(id) || isNaN(freq)) {
      throw new Error("deviceId or frequency is not a number");
    }

    return await prismaClient.task.findMany({
      where: {
        deviceId: id,
        frequency: freq,
      },
    });
  },

  getCheckedTaskByDate: async (date) => {
    // Anggap date dari frontend: '2025-06-28'
    const start = new Date(`${date}T00:00:00`);
    const end = new Date(`${date}T23:59:59.999`);

    const data = await prismaClient.checkedTask.findMany({
      where: {
        monitoring: {
          Date: {
            gte: start,
            lte: end,
          },
        },
      },
      include: {
        monitoring: {
          select: {
            id: true,
            Tester: true,
            Date: true,
            Documentation: true,
            Signature: true,
            device: {
              select: {
                devicename: true,
              },
            },
          },
        },
        task: {
          select: {
            activity: true,
          },
        },
      },
    });

    const grouped = {};

    for (const item of data) {
      const monitoring = item.monitoring;

      // Gunakan format ISO string → tanggal
      const dateKey = monitoring.Date.toISOString().split("T")[0];

      if (!grouped[dateKey]) grouped[dateKey] = [];

      const existing = grouped[dateKey].find((x) => x.id === monitoring.id);

      if (existing) {
        existing.details.push(item.task.activity);
      } else {
        grouped[dateKey].push({
          id: monitoring.id,
          tester: monitoring.Tester,
          device: monitoring.device?.devicename || "Tidak diketahui",
          documentation: monitoring.Documentation || "",
          signature: monitoring.Signature || "",
          details: [item.task.activity],
        });
      }
    }

    return grouped;
  },
};

export default taskService;
