import { UserModel } from "../models/user.model.mjs";
import { GroupModel } from "../models/group.model.mjs";
import { Group } from "../types/group.type.mjs";
import { UserAndGroupModel } from "../models/user-and-group.model.mjs";
import { sequelize } from "../config/database";
export class GroupService {
  constructor() {}

  static async getAllGroups() {
    try {
      return await GroupModel.findAll();
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getGroupByID(req) {
    try {
      return await GroupModel.findByPk(req.params.id).then((data) => data);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async createGroup(req) {
    const groupBody = req.body;
    const group = new Group(groupBody);

    try {
      await GroupModel.create(group).then((data) => data.id);

      return group;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async addUserToGroup(req) {
    const groupID = req.params.id;
    const userID = req.body.id;
    const transaction = await sequelize.transaction();

    try {
      const existingUser = await UserModel.findAll({
        where: {
          id: userID,
          deleted: false,
        },
        transaction,
      });

      const userAndGroupData = await UserAndGroupModel.bulkCreate(
        existingUser.map((user) => {
          return {
            userid: user.id,
            groupid: groupID,
          };
        }),
        {
          transaction,
        }
      );

      await transaction.commit();
      return userAndGroupData;
    } catch (err) {
      await transaction.rollback();
      throw new Error(err);
    }
  }

  static async removeGroup(req) {
    const groupID = req.params.id;

    try {
      return await GroupModel.destroy({ where: { id: groupID } });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async removeUserFromGroup(req) {
    const id = req.params.id;
    const transaction = await sequelize.transaction();

    try {
      const result = await UserAndGroupModel.destroy({
        where: {
          id,
        },
        transaction,
      });

      await transaction.commit();
      return result;
    } catch (err) {
      await transaction.rollback();
      throw new Error(err);
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
      throw new Error(err);
    }
  }
}
