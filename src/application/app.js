import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicRouter } from "../routes/public-api.js";
import express from "express";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(cors());
app.use(publicRouter);
app.use(errorMiddleware);
