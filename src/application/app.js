import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicRouter } from "../routes/public-api.js";
import express from "express";

export const app = express();
app.use(express.json());

app.use(publicRouter);
app.use(errorMiddleware);
