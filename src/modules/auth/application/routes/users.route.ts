import { Router } from 'express';

import { getUsersController } from '../controllers';
import { verifyIsAdminMiddleware } from '../../../shared/application/middlewares';

export const registerRoutes = (router: Router) => {
  router.use('/auth/users', verifyIsAdminMiddleware);

  router.get('/auth/users', getUsersController);
};
