import { Router } from 'express';

import { getExercisesController, exerciseSeedController, getExercisesByUserController } from '../controllers';
import { exerciseSeedMiddlewares, exerciseGetByUserMiddlewares } from '../middlewares';

export const registerRoutes = (router: Router) => {
  router.get('/exercises', getExercisesController);
  router.get('/exercises/seed', exerciseSeedMiddlewares, exerciseSeedController);
  router.get('/exercises?userId=:userId', exerciseGetByUserMiddlewares, getExercisesByUserController);
};
