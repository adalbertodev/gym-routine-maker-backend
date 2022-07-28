import { Router } from 'express';

import { getExercisesController, getExercisesByUserController } from '../controllers';
import { getExercisesByUserMiddlewares } from '../middlewares';

export const registerRoutes = (router: Router) => {
  router.get('/exercises', getExercisesController);
  router.get('/exercises?userId=:userId', getExercisesByUserMiddlewares, getExercisesByUserController);
};
