import { Request, Response, Router } from 'express';

import { AuthGetController } from '../controllers/AuthGetController';

export const register = (router: Router) => {
  router.get('/auth/users', (req: Request, res: Response) => new AuthGetController().run(req, res));
};
