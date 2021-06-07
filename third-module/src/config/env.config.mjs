import crypto from "crypto";

export const ENV_CONFIG = {
  connectionUrl:
    "postgres://qqwcdqcn:DKbQx9AMkLudZ62a1xsa3uJEQOv0dpta@dumbo.db.elephantsql.com:5432/qqwcdqcn",
  port: 3000,
  jwtSecret: crypto.randomBytes(64).toString("base64"),
};
