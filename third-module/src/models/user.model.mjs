import Sequelize from 'sequelize';
import { sequelize } from '../config/database';

export class UserModel extends Sequelize.Model { }

export default function () {
  UserModel.init({
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    login: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    isdeleted: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  })
}

export async function initDB() {
  const users = await UserModel.findAll();
  if (users.length) {
    return;
  }

  const mockedUsers = [
    {
      id: 100,
      login: 'qwdq@q.com',
      password: 'password1',
      age: 25,
      isDeleted: false
    },
    {
      id: 101,
      login: 'fqmw@ewr.com',
      password: 'password2',
      age: 30,
      isDeleted: false
    },
    {
      id: 102,
      login: 'wemfk@ef.com',
      password: 'password3',
      age: 20,
      isDeleted: false
    },
  ];
  mockedUsers.forEach(async (value) => await UserModel.create(value));
}
