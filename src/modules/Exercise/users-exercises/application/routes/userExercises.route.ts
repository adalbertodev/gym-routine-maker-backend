import { Router } from 'express';

import { getUsersExercisesController } from '../controllers/getUsersExercisesController';
import { getUserExercisesController } from '../controllers/getUserExercisesController';
import { updateUserExercisesController } from '../controllers/updateUserExercisesController';
import { updateUserExercisesByPercentageController } from '../controllers/updateUserExercisesByPercentageController';
import { getUserExercisesMiddlewares, getUsersExercisesMiddlewares, updateUserExercisesByPercentageMiddlewares, updateUserExercisesMiddlewares } from '../middlewares';

export const registerRoutes = (router: Router) => {
  router.get('/admin/exercises', getUsersExercisesMiddlewares, getUsersExercisesController);
  router.get('/:userId/exercises', getUserExercisesMiddlewares, getUserExercisesController);
  router.post('/:userId/exercises', updateUserExercisesMiddlewares, updateUserExercisesController);
  router.put('/:userId/exercises', updateUserExercisesByPercentageMiddlewares, updateUserExercisesByPercentageController);
};
