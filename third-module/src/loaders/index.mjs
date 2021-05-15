import { initExpress } from "./express.mjs";
import { initSequelize } from "./sequelize.mjs";
import userModelInit, { initUserDB } from "../models/user.model.mjs";
import groupModelInit, { initGroupDB } from "../models/group.model.mjs";
import addManyToManyRelation from "../models/user-and-group.model.mjs";

export async function initApp() {
  initExpress();
  initSequelize();
  userModelInit();
  groupModelInit();
  addManyToManyRelation();
  await initUserDB();
  await initGroupDB();
}
