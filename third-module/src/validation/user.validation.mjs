import Joi from 'joi';
import validator from 'express-joi-validation';
class ValidationClass {
    constructor () {
        this.schema = Joi.object({
            login: Joi.string().required(),
            password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{0,}$/).required(),
            age: Joi.number().min(4).max(130).required()
        });
        this.validation = validator.createValidator({ passError: true }).body(this.schema);
    }

    validateRequest(err, _, res, next) {
        if (err && err.error && err.error.isJoi) {
            res.status(400).json({
                type: 'Error',
                message: err.error.toString()
            });
        } else {
            next();
        }
    };
}

export const validatorEntity = new ValidationClass();