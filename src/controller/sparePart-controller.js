import sparePartService from "../service/sparePart-service.js";

export const getSpareParts = async (req, res) => {
  try {
    const data = await sparePartService.getSpareParts();
    res.json(data);
  } catch (error) {
    console.error("Error getSpareParts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateSparePart = async (req, res) => {
  try {
    const updates = req.body;
    console.log("Diterima di controller:", updates); // ✅ Tambahkan log

    await sparePartService.updateSparePart(updates);

    res.json({ status: "success" });
  } catch (error) {
    console.error("Error updateKomponen:", error); // ✅ Log detail
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getSpareParts,
  updateSparePart,
};
