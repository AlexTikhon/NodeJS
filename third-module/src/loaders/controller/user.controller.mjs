import { UserService } from "../../service/user.service.mjs";
import { ErrorMethodLogger } from "../../middlewares/logger.mjs";

const compareUsersByLogin = (a, b) => {
  if (a.login.toLowerCase() > b.login.toLowerCase()) {
    return 1;
  }
  if (a.login.toLowerCase() < b.login.toLowerCase()) {
    return -1;
  }
  return 0;
};
export class UserController {
  @ErrorMethodLogger()
  static async getAutoSuggestUsers(req, res) {
    const { loginSubstring, limit } = req.query;
    const userLogins = await UserService.getAutoSuggestUsers(loginSubstring);

    const suggestedUsers = userLogins.sort(compareUsersByLogin);
    if (suggestedUsers.length > limit) {
      suggestedUsers.length = limit;
    }

    res.status(200).send(suggestedUsers);
    return suggestedUsers;
  }

  @ErrorMethodLogger()
  static async getAllUsers(_, res) {
    const users = await UserService.getAllUsers();

    res.status(200).json(users);
    return users;
  }

  @ErrorMethodLogger()
  static async getUserByID(req, res) {
    const user = await UserService.getUserByID(req);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        type: "Error",
        message: `User with id:${req.params.id} not found`,
      });
    }
  }

  @ErrorMethodLogger()
  static async createUser(req, res) {
    const user = await UserService.createUser(req);

    res.status(201).json(user);
    return user;
  }

  @ErrorMethodLogger()
  static async removeUser(req, res) {
    const removedUser = await UserService.removeUser(req);

    if (removedUser[0]) {
      res.status(200).json("Done");
    } else {
      res.status(404).json({
        type: "Error",
        message: `User with id:${req.params.id} not found`,
      });
    }
    return removedUser;
  }

  @ErrorMethodLogger()
  static async updateUser(req, res) {
    const updatedUser = await UserService.updateUser(req);

    if (updatedUser[0]) {
      res.status(200).json("Done");
    } else {
      res.status(404).json({
        type: "Error",
        message: `User with id:${req.params.id} not found`,
      });
    }
  }
}
