import reportService from "../service/report-service.js";

const createReportController = async (req, res) => {
  try {
    const report = await reportService.createReport(req.body);
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllReportController = async (req, res) => {
  try {
    const reports = await reportService.getAllReport();
    res.status(200).json(reports);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil laporan", error: error.message });
  }
};

export default {
  createReportController,
  getAllReportController,
};
