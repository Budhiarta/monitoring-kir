import { app } from "./application/app.js";
import { logger } from "./application/logging.js";

app.listen(8000, "0.0.0.0", () => {
  logger.info("app runing at port 8000");
});
