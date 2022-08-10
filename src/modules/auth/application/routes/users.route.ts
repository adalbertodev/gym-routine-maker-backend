import { Router } from 'express';

import { getUsersController } from '../controllers';
import { getUsersMiddlewares } from '../middlewares';

export const registerRoutes = (router: Router) => {
  router.get('/auth/users', getUsersMiddlewares, getUsersController);
};
