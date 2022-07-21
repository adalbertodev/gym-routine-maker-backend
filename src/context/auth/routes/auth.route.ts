import { Router } from 'express';

import { authGetController } from '../controllers';

export const register = (router: Router) => {
  router.get('/auth/users', authGetController);
};
