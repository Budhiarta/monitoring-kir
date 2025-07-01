import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicRouter } from "../routes/public-api.js";
import express from "express";
import cors from "cors";

export const app = express();
app.use(express.json());

app.use("/public", express.static("public"));
app.use(cors());
app.use(publicRouter);
app.use(errorMiddleware);
