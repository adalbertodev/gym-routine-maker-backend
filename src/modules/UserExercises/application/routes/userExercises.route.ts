import { Router } from 'express';
import { newExerciseMiddlewares, updateExerciseMiddlewares, deleteExerciseMiddlewares } from '../middlewares/userExercisesMiddlewares';

import {
  getUsersExercisesController,
  getUserExercisesController,
  updateUsersExercisesByPercentageController,
  newExerciseController,
  updateExerciseController,
  deleteExerciseController
} from '../controllers';
import {
  getUserExercisesMiddlewares,
  getUsersExercisesMiddlewares,
  updateUserExercisesByPercentageMiddlewares
} from '../middlewares';

export const registerRoutes = (router: Router) => {
  router.get('/admin/exercises', getUsersExercisesMiddlewares, getUsersExercisesController);
  router.get('/:userId/exercises', getUserExercisesMiddlewares, getUserExercisesController);
  router.put(
    '/:userId/exercises',
    updateUserExercisesByPercentageMiddlewares,
    updateUsersExercisesByPercentageController
  );

  router.post('/:userId/exercises', newExerciseMiddlewares, newExerciseController);
  router.put('/:userId/exercises/:id', updateExerciseMiddlewares, updateExerciseController);
  router.delete('/:userId/exercises/:id', deleteExerciseMiddlewares, deleteExerciseController);
};
