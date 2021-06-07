import { UserModel } from "../models/user.model.mjs";
import { User } from "../types/user.type.mjs";
import { AuthService } from "./auth.service.mjs";
export class UserService {
  constructor() {}

  static async getAllUsers() {
    return await UserModel.findAll();
  }

  static async getAutoSuggestUsers(loginSubstring) {
    return await UserModel.findAll().then((data) => {
      const matches = data.filter((u) => {
        return u.login.includes(loginSubstring) && !u.deleted;
      });
      return matches;
    });
  }

  static async getUserByID(req) {
    return await UserModel.findByPk(req.params.id).then((data) => data);
  }

  static async createUser(req) {
    const userBody = req.body;
    const user = new User(userBody);

    await UserModel.create(user).then((data) => data.id);
    return user;
  }

  static async removeUser(req) {
    const userId = req.params.id;

    return await UserModel.update({ deleted: true }, { where: { id: userId } });
  }

  static async updateUser(req) {
    const userBody = req.body;
    const userId = req.params.id;

    return await UserModel.update({ ...userBody }, { where: { id: userId } });
  }

  static async login(login, password) {
    try {
      const user = await UserModel.findOne({ where: { login, password } });

      if (!user) {
        return null;
      }

      const token = AuthService.createToken(login);
      return token;
    } catch (err) {
      throw new Error(err);
    }
  }
}
