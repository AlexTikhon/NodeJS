import { logger } from "./logger.mjs";

export const errorMiddleware = (err, req, res, next) => {
  if (err) {
    res.status(500).json({
      status: "failed",
      errors: [`Failed to process request: ${err.message}`],
    });
    logger.error(err.message);
    res.status(500).json({
      status: "failed",
      errors: [
        `Failed to process request: ${
          err.message ? err.message : "Internal Server Error"
        }`,
      ],
    });
  }
  next();
};
