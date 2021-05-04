import Sequelize from 'sequelize';
import { sequelize } from '../config/database';

export class UserModel extends Sequelize.Model { }

export default function () {
  UserModel.init({
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
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
    deleted: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  })
}

// initialize DB with mocked users, if there are no users
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
      deleted: false
    },
    {
      id: 101,
      login: 'fqmw@ewr.com',
      password: 'password2',
      age: 30,
      deleted: false
    },
    {
      id: 102,
      login: 'wemfk@ef.com',
      password: 'password3',
      age: 20,
      deleted: false
    },
    {
      id: 103,
      login: 'kljwemfk@ef.com',
      password: 'password4',
      age: 20,
      deleted: false
    },
    {
      id: 104,
      login: 'wemsadfk@ef.com',
      password: 'password5',
      age: 20,
      deleted: false
    }
  ];
  await UserModel.bulkCreate(mockedUsers);
}
