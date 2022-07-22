import { Request, Response, Router } from 'express';

import { AuthGetController } from '../controllers/AuthGetController';
import { AuthLoginController } from '../controllers/AuthLoginController';
import { AuthRegisterController } from '../controllers/AuthRegisterController';
import { AuthRenewTokenController } from '../controllers/AuthRenewTokenController';

export const register = (router: Router) => {
  router.get('/auth/users', (req: Request, res: Response) => new AuthGetController().run(req, res));

  router.post('/auth', (req: Request, res: Response) => new AuthLoginController().run(req, res));
  router.post('/auth/new', (req: Request, res: Response) => new AuthRegisterController().run(req, res));
  router.get('/auth/renew', (req: Request, res: Response) => new AuthRenewTokenController().run(req, res));
};
