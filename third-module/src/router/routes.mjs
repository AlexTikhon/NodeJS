import express from 'express';

import { ROUTES } from '../config/routes.config.mjs';
import { validatorEntity } from '../validation/user.validation.mjs';
import { UserController } from '../loaders/controller/user.controller.mjs';

export const router = express.Router();

router.get('/', (_, res) => {
    res.send('<div><h1>Hi there</h1></div>');
});

router.get(ROUTES.GET_ALL, UserController.getAllUsers);

router.get(ROUTES.GET_USER, UserController.getUserByID);

router.post(ROUTES.CREATE_USER, validatorEntity.validation, UserController.createUser);

router.put(ROUTES.UPDATE_USER, validatorEntity.validation, UserController.updateUser);

router.delete(ROUTES.REMOVE_USER, UserController.removeUser);

router.get(ROUTES.GET_SUGGESTED_USERS, UserController.getAutoSuggestUsers);

