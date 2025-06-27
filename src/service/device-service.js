import { prismaClient } from "../application/database.js";

const deviceService = {
  getAllDevices: async () => {
    return await prismaClient.device.findMany();
  },
};

export default deviceService;
