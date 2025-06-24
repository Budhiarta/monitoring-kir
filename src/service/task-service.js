import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { startOfDay, endOfDay } from "date-fns";

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
    return await prismaClient.checkedTask.findMany({
      where: {
        monitoring: {
          Date: {
            gte: startOfDay(date),
            lte: endOfDay(date),
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
          },
        },
        task: {
          select: {
            id: true,
            activity: true,
            device: {
              select: {
                devicename: true, // atau apapun field di Device kamu
              },
            },
          },
        },
      },
    });
  },
};

export default taskService;
