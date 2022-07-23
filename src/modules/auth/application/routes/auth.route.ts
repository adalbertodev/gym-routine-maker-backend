import { Router } from 'express';

import {
  loginMiddlewares,
  registerMiddlewares,
  renewTokenMiddlewares
} from '../middlewares';
import {
  authLoginController,
  authRegisterController,
  authRenewTokenController
} from '../controllers';

export const registerRoutes = (router: Router) => {
  router.post('/auth', loginMiddlewares, authLoginController);
  router.post('/auth/new', registerMiddlewares, authRegisterController);
  router.get('/auth/renew', renewTokenMiddlewares, authRenewTokenController);
};
