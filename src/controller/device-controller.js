import deviceService from "../service/device-service.js";

export const getDevices = async (req, res) => {
  try {
    const data = await deviceService.getAllDevices();
    res.json(data);
  } catch (error) {
    console.error("Error getAllDevices:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getDevices,
};
