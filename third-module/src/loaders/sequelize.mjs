import { sequelize } from "../config/database.mjs";
import { logger } from "../middlewares/logger.mjs";

export function initSequelize() {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      logger.error("DB error", err);
    });
}
