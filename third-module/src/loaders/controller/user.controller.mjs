import { UserModel } from '../../models/user.model.mjs'

class User {
    constructor(userBody) {
        this.id = String(existingUsers.length ? existingUsers.length : 0);
        this.login = userBody.login;
        this.password = userBody.password;
        this.age = Number(userBody.age);
        this.isDeleted = false;
    }
}

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
    static async getAutoSuggestUsers(req, res) {
        const { loginSubstring, limit } = req.query;
        const userLogins = await UserModel.findAll().then((data) => {
            data.filter((u) => u.login.includes(loginSubstring) && !u.isDeleted);
        });
    
        const suggestedUsers = userLogins.sort(compareUsersByLogin);
    
        if (suggestedUsers.length > limit) {
            suggestedUsers.length = limit;
        }
    
        res.status(200).send(suggestedUsers);
        return suggestedUsers;
    };
    
    static async getAllUsers(_, res) {
        const users = await UserModel.findAll();
        res.status(200).json(existingUsers);

        return users;
    };
    
    static async getUserByID(req, res) {
        const user = await UserModel.findByPK(req.params.id).then((data) => data);
    
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                type: 'Error',
                message: `User with id:${req.params.id} not found`
            });
        }
    };
    
    static async createUser(req, res) {
        const userBody = req.body;
        const user = new User(userBody);

        const id = await UserModel.create(user).then(data => data.getDataValue('id'))

        res.status(201).json(user);

        return id;
    };
    
    static async removeUser(req, res) {
        const userBody = req.body;

        const removedUser = await UserModel.update(
            {isDeleted: true},
            {where: {id: userBody.id}}
        );
    
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                type: 'Error',
                message: `User with id:${req.params.id} not found`
            });
        }

        return removedUser;
    };
    
    static async updateUser(req, res) {
        const userBody = req.body;

        const updatedUser = await UserModel.update(
            {...userBody},
            {where: {id: userBody.id}}
        );
    
        if (user) {
            res.status(200).json(userBody);
        } else {
            res.status(404).json({
                type: 'Error',
                message: `User with id:${req.body.id} not found or has been deleted`
            });
        }

        return updatedUser;
    };
}