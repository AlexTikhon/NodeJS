import jwt from "jsonwebtoken";
import { ENV_CONFIG } from "../config/env.config.mjs";

export class AuthService {
  static createToken(login) {
    return jwt.sign({ login }, ENV_CONFIG.jwtSecret);
  }
}
