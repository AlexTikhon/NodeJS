import Sequelize from 'sequelize';
import { ENV_CONFIG } from './env.config';

export const sequelize = new Sequelize(ENV_CONFIG.connectionUrl, {
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
});
