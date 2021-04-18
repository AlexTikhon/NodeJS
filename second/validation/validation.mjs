import Joi from 'joi';
import validator from 'express-joi-validation';

import { existingUsers } from '../controller/server.mjs';

export const validateLogin = (userLogin) => {
    const isUserExist = existingUsers.find((u) => u.login === userLogin);
    if (isUserExist) {
        throw new Error(`user ${userLogin} already exists`);
    }
    return userLogin;
};

export const validateRequest = (err, _, res, next) => {
    if (err && err.error && err.error.isJoi) {
        res.status(400).json({
            type: 'Error',
            message: err.error.toString()
        });
    } else {
        next();
    }
};

const schema = Joi.object({
    id: Joi.string(),
    login: Joi.string().required().custom(validateLogin),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{0,}$/).required(),
    age: Joi.number().min(4).max(130).required()
});

export const validation = validator.createValidator({ passError: true }).body(schema);
