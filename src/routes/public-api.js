import express from "express";
import userController from "../controller/user-controller.js";
import monitoringController from "../controller/monitoring-controller.js";
import taskController from "../controller/task-controller.js";
import sparePartController from "../controller/sparePart-controller.js";
import deviceController from "../controller/device-controller.js";
import reportController from "../controller/report-controller.js";

const publicRouter = new express.Router();
//user
publicRouter.post("/user", userController.register);
publicRouter.post("/user/login", userController.login);
publicRouter.post("/user/login-web", userController.loginWeb);
publicRouter.get("/user/getAllUsers", userController.getUsers);

//Monitoring
publicRouter.get("/monitoring", monitoringController.getMonitoring);
publicRouter.get("/monitoring/:id", monitoringController.getMonitoringById);
publicRouter.post("/monitoring", monitoringController.createMonitoring);
publicRouter.put("/monitoring/:id", monitoringController.updateMonitoring);
publicRouter.delete("/monitoring/:id", monitoringController.deleteMonitoring);

//task
publicRouter.get("/task/checkedBydate", taskController.getCheckedTaskByDate);
publicRouter.post("/task", taskController.createCheckedTaskController);
publicRouter.get("/task/:id", taskController.getTaskByDeviceId);
publicRouter.get(
  "/task/:deviceId/:frequency",
  taskController.getTaskByDeviceIdFrequency
);

//sparePart
publicRouter.get("/spareParts", sparePartController.getSpareParts);
publicRouter.put("/sparePart", sparePartController.updateSparePart);
export { publicRouter };

//Device
publicRouter.get("/devices", deviceController.getDevices);

//report
publicRouter.post("/report", reportController.createReportController);
publicRouter.get("/reports", reportController.getAllReportController);

//test
