import { UserModel } from "../models/user.model.mjs";
import { GroupModel } from "../models/group.model.mjs";
import { Group } from "../types/group.type.mjs";
import { UserAndGroupModel } from "../models/user-and-group.model.mjs";
export class GroupService {
  constructor() {}

  static async getAllGroups() {
    try {
      return await GroupModel.findAll();
    } catch (err) {
      throw new Error(error);
    }
  }

  static async getGroupByID(req) {
    try {
      return await GroupModel.findByPk(req.params.id).then((data) => data);
    } catch (err) {
      throw new Error(error);
    }
  }

  static async createGroup(req) {
    const groupBody = req.body;
    const group = new Group(groupBody);

    try {
      await GroupModel.create(group).then((data) => data.id);
      return group;
    } catch (err) {
      throw new Error(error);
    }
  }

  static async removeGroup(req) {
    const groupID = req.params.id;

    try {
      return await GroupModel.destroy({ where: { id: groupID } });
    } catch (err) {
      throw new Error(error);
    }
  }

  static async updateGroup(req) {
    const groupBody = req.body;
    const groupID = req.params.id;

    try {
      return await GroupModel.update(
        { ...groupBody },
        { where: { id: groupID } }
      );
    } catch (err) {
      throw new Error(error);
    }
  }
}
