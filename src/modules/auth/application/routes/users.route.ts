import { Router } from 'express';

import { authGetUsersController, authSeedController } from '../controllers';
import { validateAdminMiddleware } from '../../../shared/application/middlewares';
import { userSeedMiddlewares } from '../middlewares';

export const registerRoutes = (router: Router) => {
  router.use('/auth/users', validateAdminMiddleware);

  router.get('/auth/users', authGetUsersController);
  router.get('/auth/users/seed', userSeedMiddlewares, authSeedController);
};
