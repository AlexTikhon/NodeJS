import { UserModel } from '../models/user.model.mjs';

const compareUsersByLogin = (a, b) => {
    if (a.login.toLowerCase() > b.login.toLowerCase()) {
        return 1;
    }
    if (a.login.toLowerCase() < b.login.toLowerCase()) {
        return -1;
    }
    return 0;
};
export class User {
    constructor(userBody) {
        this.id = Math.round(Math.random() * 10000);
        this.login = userBody.login;
        this.password = userBody.password;
        this.age = Number(userBody.age);
        this.deleted = false;
    }
}

export class UserService {
    constructor() {}

    static async getAllUsers() {
        return await UserModel.findAll();
    }

    static async getAutoSuggestUsers(loginSubstring, limit) {
        const userLogins = await UserModel.findAll().then((data) => {
            const matches = data.filter((u) => {
                return u.login.includes(loginSubstring) && !u.deleted;
            });
            return matches;
        });

        const suggestedUsers = userLogins.sort(compareUsersByLogin);
        if (suggestedUsers.length > limit) {
            suggestedUsers.length = limit;
        }

        return suggestedUsers;
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