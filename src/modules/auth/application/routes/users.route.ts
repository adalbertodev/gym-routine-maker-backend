import { Router } from 'express';

import { authGetUsersController } from '../controllers';
import { validateAdminMiddleware } from '../../../shared/application/middlewares/validateAdminMiddleware';

export const registerRoutes = (router: Router) => {
  router.use('/auth/users', validateAdminMiddleware);

  router.get('/auth/users', authGetUsersController);
};
