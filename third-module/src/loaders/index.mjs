import { initExpress } from './express.mjs';
import { initSequelize } from './sequelize.mjs';
import  userModelInit, { initDB } from '../models/user.model.mjs';

export async function initApp() {
    initExpress();
    initSequelize();
    userModelInit();
    await initDB();
}