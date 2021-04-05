import Router from 'express';
import { getUserByID, createUser, getAllUsers, updateUser, removeUser, getAutoSuggestUsers } from '../controller/server.mjs';
import { ROUTES } from './config.mjs';
import { validation } from '../validation/validation.mjs';
const router = Router();

router.get('/', (_, res) => {
    res.send('<div><h1>Hi there</h1></div>');
});

router.get(ROUTES.GET_ALL, getAllUsers);

router.get(ROUTES.GET_USER, getUserByID);

router.post(ROUTES.CREATE_USER, validation, createUser);

router.put(ROUTES.UPDATE_USER, updateUser);

router.delete(ROUTES.REMOVE_USER, removeUser);

router.get(ROUTES.GET_SUGGESTED_USERS, getAutoSuggestUsers);

export default router;
