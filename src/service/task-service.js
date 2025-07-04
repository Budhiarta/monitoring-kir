import { prismaClient } from "../application/database.js";
import { format } from "date-fns";

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

  getCheckedTaskByDate: async (targetDate) => {
    // Ambil semua checked task beserta relasi monitoring dan task
    const data = await prismaClient.checkedTask.findMany({
      where: {
        monitoring: {}, // Prisma butuh ini agar include monitoring
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
      const activity = item.task?.activity;

      // Validasi field penting
      if (!monitoring?.Date || !activity) continue;

      const dateKey = format(monitoring.Date, "yyyy-MM-dd");

      // Filter hanya tanggal yang cocok
      if (dateKey !== targetDate) continue;

      // Inisialisasi array jika belum ada
      if (!grouped[dateKey]) grouped[dateKey] = [];

      // Cek apakah monitoring.id sudah ada dalam daftar tanggal
      const existingEntry = grouped[dateKey].find(
        (entry) => entry.id === monitoring.id
      );

      if (existingEntry) {
        existingEntry.details.push(activity);
      } else {
        grouped[dateKey].push({
          id: monitoring.id,
          tester: monitoring.Tester,
          device: monitoring.device?.devicename || "Tidak diketahui",
          documentation: monitoring.Documentation || "",
          signature: monitoring.Signature || "",
          details: [activity],
        });
      }
    }

    console.log("📦 Grouped data:", grouped);
    return grouped;
  },
};

export default taskService;
