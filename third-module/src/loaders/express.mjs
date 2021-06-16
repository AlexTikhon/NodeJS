import express from "express";
import cors from "cors";

import { ENV_CONFIG } from "../config/env.config.mjs";
import { router } from "../router/routes.mjs";
import { validatorEntity } from "../validation/user.validation.mjs";
import { logger } from "../middlewares/logger.mjs";
import { loggerMiddleware } from "../middlewares/logger.middleware.mjs";
import { errorMiddleware } from "../middlewares/error.middleware.mjs";

export function initExpress() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(loggerMiddleware);
  app.use(router);
  app.use(errorMiddleware);
  app.use(validatorEntity.validateRequest);

  app.listen(ENV_CONFIG.port, () => {
    logger.info(`Server is running at the ${ENV_CONFIG.port} port`);
  });

  process
    .on("uncaughtException", (err) => {
      logger.error(err.name, `Uncaught exception thrown: ${err}`);
      process.exit(1);
    })
    .on("unhandledRejection", (err, p) => {
      logger.error(err.name, `Unhandled rejection at Promise: ${p}`);
    });
}
