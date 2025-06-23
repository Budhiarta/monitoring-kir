import { prismaClient } from "../application/database.js";

const sparePartService = {
  getSpareParts: async () => {
    return await prismaClient.sparePart.findMany();
  },

  updateSparePart: async (updates) => {
    console.log("Diterima di service:", updates); // ✅ log data

    const updatePromises = Object.entries(updates).map(async ([id, jumlah]) => {
      console.log(`Update ID ${id}, tambah ${jumlah}`); // ✅ log detail per item
      return prismaClient.sparePart.update({
        where: { id: parseInt(id) },
        data: {
          qty: {
            increment: jumlah,
          },
        },
      });
    });

    return Promise.all(updatePromises); // ✅ WAJIB ada ini
  },
};

export default sparePartService;
