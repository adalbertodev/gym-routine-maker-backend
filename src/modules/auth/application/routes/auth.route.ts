import { Request, Response, Router } from 'express';

import { AuthGetController } from '../controllers/AuthGetController';
import { AuthLoginController } from '../controllers/AuthLoginController';
import { AuthRegisterController } from '../controllers/AuthRegisterController';
import { AuthRenewTokenController } from '../controllers/AuthRenewTokenController';
import { loginMiddlewares, registerMiddlewares } from '../middlewares';
import { getUsersMiddlewares } from '../middlewares/getUsersMiddlewares';
import { renewTokenMiddlewares } from '../middlewares/renewTokenMiddlewares';

export const register = (router: Router) => {
  router.get('/auth/users', getUsersMiddlewares, (req: Request, res: Response) => new AuthGetController().run(req, res));

  router.post('/auth', loginMiddlewares, (req: Request, res: Response) => new AuthLoginController().run(req, res));
  router.post('/auth/new', registerMiddlewares, (req: Request, res: Response) => new AuthRegisterController().run(req, res));
  router.get('/auth/renew', renewTokenMiddlewares, (req: Request, res: Response) => new AuthRenewTokenController().run(req, res));
};
