import Sequelize from "sequelize";
import { sequelize } from "../config/database";

export class GroupModel extends Sequelize.Model {}

export default function () {
  GroupModel.init(
    {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      permissions: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Group",
      tableName: "groups",
    }
  );
}

// initialize DB with mocked groups, if there are no groups
export async function initGroupDB() {
  const groups = await GroupModel.findAll();
  if (groups.length) {
    return;
  }

  const mockedGroups = [
    {
      id: 1,
      name: "group_1",
      permissions: "READ",
    },
    {
      id: 2,
      name: "group_2",
      permissions: "WRITE",
    },
    {
      id: 3,
      name: "group_3",
      permissions: "DELETE",
    },
    {
      id: 4,
      name: "group_4",
      permissions: "SHARE",
    },
  ];
  await GroupModel.bulkCreate(mockedGroups);
}
