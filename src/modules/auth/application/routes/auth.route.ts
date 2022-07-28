import { Router } from 'express';

import {
  loginMiddlewares,
  registerMiddlewares,
  renewTokenMiddlewares
} from '../middlewares';
import {
  loginController,
  registerController,
  renewTokenController
} from '../controllers';

export const registerRoutes = (router: Router) => {
  router.post('/auth', loginMiddlewares, loginController);
  router.post('/auth/new', registerMiddlewares, registerController);
  router.get('/auth/renew', renewTokenMiddlewares, renewTokenController);
};
