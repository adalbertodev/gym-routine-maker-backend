import { Router } from 'express';

import { getUsersController } from '../controllers';
import { validateAdminMiddleware } from '../../../shared/application/middlewares';

export const registerRoutes = (router: Router) => {
  router.use('/auth/users', validateAdminMiddleware);

  router.get('/auth/users', getUsersController);
};
