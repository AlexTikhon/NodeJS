import { logger } from "./logger.mjs";

export const loggerMiddleware = (req, res, next) => {
  logger.info(`Invoked route ${req.path}`, {
    body: req.body,
    params: req.params,
    query: req.query,
  });
  next();
};
