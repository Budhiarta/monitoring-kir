import taskService from "../service/task-service.js";
import { prismaClient } from "../application/database.js";

const createCheckedTaskController = async (req, res) => {
  const { taskId, monitoringId, checked } = req.body;

  console.log("Received body:", { taskId, monitoringId, checked });

  try {
    const newCheckedTask = await taskService.createIsCheckedTask({
      taskId,
      monitoringId,
      checked,
    });
    res.status(201).json(newCheckedTask);
  } catch (error) {
    console.error("Error creating checked task:", error.message);
    res.status(500).json({ error: error.message });
  }
};
const getTaskByDeviceId = async (req, res) => {
  console.log("➡ getTaskByDeviceId terpanggil dengan:", req.params.id);
  const { id } = req.params;

  const deviceId = Number(id);
  if (isNaN(deviceId)) {
    return res.status(400).json({ error: "deviceId harus berupa angka" });
  }

  try {
    const task = await taskService.getTaskByDeviceId(deviceId);

    if (!task || task.length === 0) {
      return res
        .status(404)
        .json({ error: "Task tidak ditemukan untuk device ini" });
    }

    res.json(task);
  } catch (error) {
    console.error("Controller Error: ", error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getTaskByDeviceIdFrequency = async (req, res) => {
  const deviceId = Number(req.params.deviceId);
  const frequency = Number(req.params.frequency);

  if (isNaN(deviceId) || isNaN(frequency)) {
    return res
      .status(400)
      .json({ error: "deviceId dan frequency harus berupa angka" });
  }

  try {
    const tasks = await taskService.getTaskByDeviceIdFrequency(
      deviceId,
      frequency
    );
    res.json(tasks);
  } catch (err) {
    console.error("Controller Error: ", err);
    res.status(500).json({ message: err.message });
  }
};

export const getCheckedTaskByDate = async (req, res) => {
  console.log("getCheckedTaskByDate terpanggil dengan:", req.query.date);
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Tanggal harus disediakan" });
  }

  try {
    const data = await taskService.getCheckedTaskByDate(date);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      error: "Gagal mengambil data task yang diceklis",
      detail: error.message,
      stack: error.stack,
    });
  }
};

export default {
  createCheckedTaskController,
  getTaskByDeviceId,
  getTaskByDeviceIdFrequency,
  getCheckedTaskByDate,
};
