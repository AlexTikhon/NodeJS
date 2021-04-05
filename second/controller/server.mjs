class User {
    constructor(userBody) {
        this.id = String(existingUsers.length ? existingUsers.length : 0);
        this.login = userBody.login;
        this.password = userBody.password;
        this.age = Number(userBody.age);
        this.isDeleted = false;
    }
}

export const existingUsers = [
    {
        id: '0', login: 'xaq32wea@epam.com', password: 'qwe123', age: 30, isDeleted: false
    },
    {
        id: '1', login: 'bdqb@epam.com', password: 'qwe123', age: 25, isDeleted: false
    },
    {
        id: '2', login: 'nccs12ad@epam.com', password: 'qwe123', age: 20, isDeleted: false
    },
    {
        id: '3', login: 'adfdsfd@yahoo.com', password: 'qwe123', age: 35, isDeleted: false
    },
    {
        id: '4', login: 'eedfdsf@yahoo.com', password: 'qwe123', age: 40, isDeleted: false
    },
    {
        id: '5', login: 'qwe@google.com', password: 'qwe123', age: 40, isDeleted: false
    },
    {
        id: '6', login: 'cwvs12@google.com', password: 'qwe123', age: 40, isDeleted: false
    },
    {
        id: '7', login: 'ferga@google.com', password: 'qwe123', age: 10, isDeleted: false
    },
    {
        id: '8', login: 'qwdqw12@google.com', password: 'qwe123', age: 40, isDeleted: false
    },
    {
        id: '9', login: 'e23edfdewf12dsf@google.com', password: 'qwe123', age: 30, isDeleted: false
    },
    {
        id: '10', login: 'ponmjdwen@apple.com', password: 'qwe123', age: 10, isDeleted: false
    },
    {
        id: '11', login: 'iuhndo12@apple.com', password: 'qwe123', age: 40, isDeleted: false
    },
    {
        id: '12', login: 'rwqmd@apple.com', password: 'qwe123', age: 20, isDeleted: false
    },
    {
        id: '13', login: 'ealv@yandex.com', password: 'qwe123', age: 40, isDeleted: false
    },
    {
        id: '14', login: 'lasljqlf@yandex.com', password: 'qwe123', age: 50, isDeleted: false
    },
    {
        id: '15', login: 'jfjje@yandex.com', password: 'qwe123', age: 40, isDeleted: false
    }
];

const checkRequestBody = (reqBody, res) => {
    if (!reqBody) {
        res.status(400).send({
            message: 'Body can not be empty'
        });
        return;
    }
};

const compareUsersByLogin = (a, b) => {
    if (a.login.toLowerCase() > b.login.toLowerCase()) {
        return 1;
    }
    if (a.login.toLowerCase() < b.login.toLowerCase()) {
        return -1;
    }
    return 0;
};

export const getAutoSuggestUsers = (req, res) => {
    const { loginSubstring, limit } = req.query;
    const userLogins = existingUsers.filter((u) => u.login.includes(loginSubstring) && !u.isDeleted);

    const suggestedUsers = userLogins.sort(compareUsersByLogin);

    if (suggestedUsers.length > limit) {
        suggestedUsers.length = limit;
    }

    res.status(200).send(suggestedUsers);
    return suggestedUsers;
};

export const getAllUsers = (_, res) => {
    res.status(200).json(existingUsers);
};

export const getUserByID = (req, res) => {
    const user = existingUsers.find((u) => {
        if (req.params && u.id === req.params.id) {
            return u;
        }
    });

    return user ? res.status(200).json(user) : res.status(404).send('User not found');
};

export const createUser = (req, res) => {
    const userBody = req.body;
    checkRequestBody(userBody, res);

    const user = new User(userBody);
    existingUsers.push(user);
    res.status(201).json(user);
};

export const removeUser = (req, res) => {
    const user = existingUsers.find((u) => {
        if (u.id === req.params.id) {
            u.isDeleted = true;
            return u;
        }
    });

    return user ? res.status(200).json(user) : res.status(404).send('User not found');
};

export const updateUser = (req, res) => {
    const userBody = req.body;
    checkRequestBody(userBody, res);

    if (!userBody.id) {
        res.status(400).send('Need user.id to update user');
        return;
    }

    const user = existingUsers.find((u, i, arr) => {
        if (u.id === userBody.id) {
            userBody.age = (userBody.age) ? Number(userBody.age) : u.age;
            userBody.login = (userBody.login) ? userBody.login : u.login;
            userBody.password = (userBody.password) ? userBody.password : u.password;
            userBody.isDeleted = (userBody.isDeleted) ? JSON.parse(userBody.isDeleted.toLowerCase()) : u.isDeleted;

            arr.splice(i, 1, userBody);

            return u;
        }
    });

    return user ? res.status(200).json(userBody) : res.status(404).send('User not found');
};
