import jwt from "jsonwebtoken";

import { UserService } from "../../service/user.service.mjs";
import { ENV_CONFIG } from "../../config/env.config.mjs";

export class AuthController {
  static async login(req, res) {
    try {
      const data = { ...req.body };
      const token = await UserService.login(data.login, data.password);

      if (!token) {
        res.status(404).json({
          type: "Error",
          message: `User not found`,
        });
        return;
      }

      res.send({ token });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({
        type: "Error",
        message: `Unauthorized Error`,
      });
      return;
    }

    jwt.verify(token, ENV_CONFIG.jwtSecret, (err, user) => {
      if (err) {
        res.status(403).json({
          type: "Error",
          message: `Forbidden Error`,
        });
        return;
      }

      req.user = user;
      next();
    });
  }
}
