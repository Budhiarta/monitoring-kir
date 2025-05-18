import express from "express";
import userController from "../controller/user-controller.js";
import monitoringController from "../controller/monitoring-controller.js";

const publicRouter = new express.Router();
//user
publicRouter.post("/user", userController.register);
publicRouter.post("/user/login", userController.login);
publicRouter.post("/user/login-web", userController.loginWeb);
publicRouter.post("/user/getAllUsers", userController.login);

//Device
publicRouter.get("/monitoring", monitoringController.getMonitoring);
publicRouter.get("/monitoring/:id", monitoringController.getMonitoringById);
publicRouter.post("/monitoring", monitoringController.createMonitoring);
publicRouter.put("/monitoring/:id", monitoringController.updateMonitoring);
publicRouter.delete("/monitoring/:id", monitoringController.deleteMonitoring);

export { publicRouter };
