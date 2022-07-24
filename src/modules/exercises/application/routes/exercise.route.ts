import { Router } from 'express';

import { exerciseGetAllController, exerciseSeedController, exercisesGetByUserController } from '../controllers';
import { exerciseSeedMiddlewares, exerciseGetByUserMiddlewares } from '../middlewares';

export const registerRoutes = (router: Router) => {
  router.get('/exercises', exerciseGetAllController);
  router.get('/exercises/seed', exerciseSeedMiddlewares, exerciseSeedController);
  router.get('/exercises/:userId', exerciseGetByUserMiddlewares, exercisesGetByUserController);
};
