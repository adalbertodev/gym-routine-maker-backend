import { Router } from 'express';

import { getExercisesByUserMiddlewares } from '../middlewares';
import {
  deleteExerciseController,
  getExerciseController,
  getExercisesByUserController,
  getExercisesController,
  newExerciseController,
  updateExerciseController
} from '../controllers';
import {
  getExercisesMiddlewares,
  getExerciseMiddlewares,
  newExerciseMiddlewares,
  updateExerciseMiddlewares,
  deleteExerciseMiddlewares

} from '../middlewares/exerciseMiddlewares';

export const registerRoutes = (router: Router) => {
  router.get('/exercises', getExercisesMiddlewares, getExercisesController);
  router.get(
    '/exercises?userId=:userId',
    getExercisesByUserMiddlewares,
    getExercisesByUserController
  );
  router.get('/exercises/:id', getExerciseMiddlewares, getExerciseController);
  router.post('/exercises', newExerciseMiddlewares, newExerciseController);
  router.put('/exercises/:id', updateExerciseMiddlewares, updateExerciseController);
  router.delete('/exercises/:id', deleteExerciseMiddlewares, deleteExerciseController);
};
