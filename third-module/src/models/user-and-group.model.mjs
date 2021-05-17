import Sequelize from "sequelize";
import { GroupModel } from "./group.model";
import { UserModel } from "./user.model";
import { sequelize } from "../config/database";

export class UserAndGroupModel extends Sequelize.Model {}

export default function () {
  UserAndGroupModel.init(
    {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      userid: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      groupid: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelname: "UserAndGroup",
      tableName: "userandgroup",
    }
  );

  UserModel.belongsToMany(GroupModel, {
    through: "userandgroup",
    foreignKey: "userid",
  });

  GroupModel.belongsToMany(UserModel, {
    through: "userandgroup",
    foreignKey: "groupid",
  });
}
