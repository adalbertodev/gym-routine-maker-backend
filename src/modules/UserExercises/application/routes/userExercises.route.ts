import { Router } from 'express';

import {
  deleteExerciseController,
  getUserExercisesController,
  getUsersExercisesController,
  newExerciseController,
  newUserExercisesController,
  updateExerciseController,
  updateUsersExercisesByPercentageController
} from '../controllers';
import {
  deleteExerciseMiddlewares,
  getUserExercisesMiddlewares,
  getUsersExercisesMiddlewares,
  newExerciseMiddlewares,
  newUserExercisesMiddlewares,
  updateExerciseMiddlewares,
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

  router.post('/:userId/exercises/new', newUserExercisesMiddlewares, newUserExercisesController);
  router.post('/:userId/exercises', newExerciseMiddlewares, newExerciseController);
  router.put('/:userId/exercises/:id', updateExerciseMiddlewares, updateExerciseController);
  router.delete('/:userId/exercises/:id', deleteExerciseMiddlewares, deleteExerciseController);
};
