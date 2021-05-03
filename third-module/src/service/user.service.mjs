import { UserModel } from '../models/user.model.mjs';
import { User } from '../types/user.type.mjs';
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
    };

    static async createUser(req) {
        const userBody = req.body;
        const user = new User(userBody);

        await UserModel.create(user).then(data => data.id)
        return user;
    };

    static async removeUser(req) {
        const userBody = req.body;

        return await UserModel.update(
            {deleted: true},
            {where: {id: userBody.id}}
        );
    };

    static async updateUser(req) {
        const userBody = req.body;

        return await UserModel.update(
            {...userBody},
            {where: {id: userBody.id}}
        );
    };
}