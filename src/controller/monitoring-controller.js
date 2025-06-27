import monitoringService from "../service/monitoring-service.js";
import { prismaClient } from "../application/database.js";

const getMonitoringById = async (req, res) => {
  const { id } = req.params;

  try {
    const monitoring = await monitoringService.getMonitoringById(id);

    if (!monitoring) {
      return res.status(404).json({ error: "Monitoring not Found" });
    }

    res.json(monitoring);
  } catch (error) {
    console.error("Controller Error: ", error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getMonitoring = async (req, res) => {
  try {
    const monitorings = await monitoringService.getAllMonitorings();
    res.json(monitorings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createMonitoring = async (req, res) => {
  try {
    const { Tester, ...otherData } = req.body;

    if (!Tester) {
      return res
        .status(400)
        .json({ error: "Tester dan deviceName wajib diisi" });
    }

    const user = await prismaClient.user.findFirst({
      where: { username: Tester },
    });
    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    const completeData = {
      ...otherData,
      Tester, // Simpan tester (username)
      userId: user.id, // Relasi user
      deviceId: device.id, // Relasi device
    };

    const newMonitoring = await monitoringService.createMonitoring(
      completeData
    );
    res.status(201).json(newMonitoring);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateMonitoring = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const updatedMonitoring = await monitoringService.updateMonitoring(
      id,
      req.body
    );
    res.json(updatedMonitoring);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMonitoring = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await monitoringService.deleteMonitoring(id);
    res.json({ message: "Monitoring deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getMonitoringById,
  getMonitoring,
  createMonitoring,
  updateMonitoring,
  deleteMonitoring,
};
