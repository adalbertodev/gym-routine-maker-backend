import { Router } from 'express';

import { authGetUsersController, authSeedDataController } from '../controllers';
import { validateAdminMiddleware } from '../../../shared/application/middlewares';

export const registerRoutes = (router: Router) => {
  router.use('/auth/users', validateAdminMiddleware);

  router.get('/auth/users', authGetUsersController);
  router.get('/auth/users/seed', authSeedDataController);
};
