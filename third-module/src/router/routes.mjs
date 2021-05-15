import express from "express";

import { USER_ROUTES, GROUP_ROUTES } from "../config/routes.config.mjs";
import { validatorEntity } from "../validation/user.validation.mjs";
import { UserController } from "../loaders/controller/user.controller.mjs";
import { GroupController } from "../loaders/controller/group.controller.mjs";

export const router = express.Router();

router.get("/", (_, res) => {
  res.send("<div><h1>Hi there</h1></div>");
});

// user path

router.get(USER_ROUTES.GET_ALL, UserController.getAllUsers);

router.get(USER_ROUTES.GET_USER, UserController.getUserByID);

router.post(
  USER_ROUTES.CREATE_USER,
  validatorEntity.validation,
  UserController.createUser
);

router.put(
  USER_ROUTES.UPDATE_USER,
  validatorEntity.validation,
  UserController.updateUser
);

router.delete(USER_ROUTES.REMOVE_USER, UserController.removeUser);

router.get(USER_ROUTES.GET_SUGGESTED_USERS, UserController.getAutoSuggestUsers);

// group path

router.get(GROUP_ROUTES.GET_ALL, GroupController.getAllGroups);

router.get(GROUP_ROUTES.GET_GROUP, GroupController.getGroupByID);

router.post(GROUP_ROUTES.CREATE_GROUP, GroupController.createGroup);

router.put(GROUP_ROUTES.UPDATE_GROUP, GroupController.updateGroup);

router.delete(GROUP_ROUTES.REMOVE_GROUP, GroupController.removeGroup);
