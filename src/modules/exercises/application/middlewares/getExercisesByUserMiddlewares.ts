import { validateUserIdMiddleware } from '../../../shared/application/middlewares/validateUserIdMiddleware';

export const getExercisesByUserMiddlewares = [
  validateUserIdMiddleware
];
