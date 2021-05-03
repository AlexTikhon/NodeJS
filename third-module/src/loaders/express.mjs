import express from 'express';

import { ENV_CONFIG } from '../config/env.config';
import { router } from '../router/routes.mjs';
import { validatorEntity } from '../validation/user.validation.mjs';

export function initExpress() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(router);
  app.use(validatorEntity.validateRequest);

  app.listen(ENV_CONFIG.port, () => {
    console.log(`Server is running at the ${ENV_CONFIG.port} port`);
  });
}
