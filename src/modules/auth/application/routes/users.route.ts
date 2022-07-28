import { Router } from 'express';

import { getUsersController, usersSeedController } from '../controllers';
import { validateAdminMiddleware } from '../../../shared/application/middlewares';
import { usersSeedMiddlewares } from '../middlewares';

export const registerRoutes = (router: Router) => {
  router.use('/auth/users', validateAdminMiddleware);

  router.get('/auth/users', getUsersController);
  router.get('/auth/users/seed', usersSeedMiddlewares, usersSeedController);
};
