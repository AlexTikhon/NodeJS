class User {
    constructor (userBody) {
        this.id = userBody.id || String(Math.floor(Math.random()*1000));
        this.login = userBody.login;
        this.password = userBody.password;
        this.age = Number(userBody.age);
        this.isDeleted = false;
    }
}

const existingUsers = [
    {id: '112', login: 'xaq32wea@epam.com', password: 'xxx', age: 30, isDeleted: false},
    {id: '123', login: 'bdqb@epam.com', password: 'xxx', age: 25, isDeleted: false},
    {id: '323', login: 'nccs12ad@epam.com', password: 'xxx', age: 20, isDeleted: false},
    {id: '444', login: 'adfdsfd@yahoo.com', password: 'xxx', age: 35, isDeleted: false},
    {id: '52', login: 'eedfdsf@yahoo.com', password: 'xxx', age: 40, isDeleted: false},
    {id: '523', login: 'qwe@google.com', password: 'xxx', age: 40, isDeleted: false},
    {id: '524', login: 'cwvs12@google.com', password: 'xxx', age: 40, isDeleted: false},
    {id: '525', login: 'ferga@google.com', password: 'xxx', age: 10, isDeleted: false},
    {id: '526', login: 'qwdqw12@google.com', password: 'xxx', age: 40, isDeleted: false},
    {id: '527', login: 'e23edfdewf12dsf@google.com', password: 'xxx', age: 30, isDeleted: false},
    {id: '528', login: 'ponmjdwen@apple.com', password: 'xxx', age: 10, isDeleted: false},
    {id: '529', login: 'iuhndo12@apple.com', password: 'xxx', age: 40, isDeleted: false},
    {id: '5', login: 'rwqmd@apple.com', password: 'xxx', age: 20, isDeleted: false},
    {id: '5902', login: 'ealv@yandex.com', password: 'xxx', age: 40, isDeleted: false},
    {id: '52322', login: 'lasljqlf@yandex.com', password: 'xxx', age: 50, isDeleted: false},
    {id: '422', login: 'jfjje@yandex.com', password: 'xxx', age: 40, isDeleted: false}
];

const checkRequestBody = (reqBody) => {
    if(!reqBody) {
        res.status(400).send({
            message: 'Body can not be empty',
        });
        return;
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
}

const getAutoSuggestUsers = (loginSubstring, limit) => {
    if (!loginSubstring && !limit) return existingUsers;

    if (!loginSubstring) return existingUsers.slice(0, limit);

    const sortedByLogin = existingUsers
        .filter((u) => u.login.includes(loginSubstring))
        .sort(compareUsersByLogin)

    if(!limit) {
        return sortedByLogin;
    } else {
        return sortedByLogin.slice(0, limit)
    }
}

export const getAllUsers = (req, res) => {
    res.status(200).json(existingUsers);
}

export const getUserByID = (req, res) => {
    const user = existingUsers.find((u) => {
        if (req.params && u.id === req.params.id) {
            return u;
        }
    });
    
    return user ? res.status(200).json(user) : res.status(404).send('User not found');
}

export const createUser = (req, res) => {
    const userBody = req.body;
    checkRequestBody(userBody);

    if (existingUsers.find((u) => { if (u.id === userBody.id) return true })) {
        updateUser(req, res);
        return;
    }

    const user = new User(userBody);
    existingUsers.push(user)
    res.status(201).json(user);
}

export const removeUser = (req, res) => {
    const user = existingUsers.find((u) => {
        if (u.id === req.params.id) {
            u.isDeleted = true;
            return u;
        }
    });

    return user ? res.status(200).json(user) : res.status(404).send('User not found');
}

export const updateUser = (req, res) => {
    const userBody = req.body;
    checkRequestBody(userBody);

    if(!userBody.id) {
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
}