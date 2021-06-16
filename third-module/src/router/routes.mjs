import express from "express";

import {
  USER_ROUTES,
  GROUP_ROUTES,
  AUTH_ROUTES,
} from "../config/routes.config.mjs";
import { validatorEntity } from "../validation/user.validation.mjs";
import { UserController } from "../loaders/controller/user.controller.mjs";
import { GroupController } from "../loaders/controller/group.controller.mjs";
import { AuthController } from "../loaders/controller/auth.controller.mjs";

export const router = express.Router();

router.get("/", (_, res) => {
  res.send("<div><h1>Hi there</h1></div>");
});

// user path

router.get(
  USER_ROUTES.GET_ALL,
  AuthController.authenticate,
  UserController.getAllUsers
);

router.get(
  USER_ROUTES.GET_USER,
  AuthController.authenticate,
  UserController.getUserByID
);

router.post(
  USER_ROUTES.CREATE_USER,
  AuthController.authenticate,
  validatorEntity.validation,
  UserController.createUser
);

router.put(
  USER_ROUTES.UPDATE_USER,
  AuthController.authenticate,
  validatorEntity.validation,
  UserController.updateUser
);

router.delete(
  USER_ROUTES.REMOVE_USER,
  AuthController.authenticate,
  UserController.removeUser,
  GroupController.removeUserFromGroup
);

router.get(
  USER_ROUTES.GET_SUGGESTED_USERS,
  AuthController.authenticate,
  UserController.getAutoSuggestUsers
);

// group path

router.get(
  GROUP_ROUTES.GET_ALL,
  AuthController.authenticate,
  GroupController.getAllGroups
);

router.get(
  GROUP_ROUTES.GET_GROUP,
  AuthController.authenticate,
  GroupController.getGroupByID
);

router.post(
  GROUP_ROUTES.CREATE_GROUP,
  AuthController.authenticate,
  GroupController.createGroup
);

router.post(
  GROUP_ROUTES.ADD_USER_TO_GROUP,
  AuthController.authenticate,
  GroupController.addUserToGroup
);

router.put(
  GROUP_ROUTES.UPDATE_GROUP,
  AuthController.authenticate,
  GroupController.updateGroup
);

router.delete(
  GROUP_ROUTES.REMOVE_GROUP,
  AuthController.authenticate,
  GroupController.removeGroup
);

// authentication path

router.post(AUTH_ROUTES.LOGIN, AuthController.login);
