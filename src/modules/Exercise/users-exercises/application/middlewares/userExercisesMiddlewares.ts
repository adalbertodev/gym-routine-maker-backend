import { body, param } from 'express-validator';
import {
  fieldValidatorMiddleware,
  validateUserIdMiddleware,
  verifyIsAdminMiddleware
} from '../../../../Shared/application/middlewares';

export const getUsersExercisesMiddlewares = [verifyIsAdminMiddleware];

export const getUserExercisesMiddlewares = [validateUserIdMiddleware];

export const updateUserExercisesMiddlewares = [
  validateUserIdMiddleware,
  param('userId', 'El id del usuario no es válido').isLength({ min: 30 }),
  body('exercises', 'Los ejercicios deben de venir').custom(exercises => {
    for (const exercise of exercises) {
      if (typeof exercise.exercise !== 'string') return;
      if (typeof exercise.rm !== 'number' && exercise.rm !== null) return;
    }
    return exercises;
  }),
  fieldValidatorMiddleware
];

export const updateUserExercisesByPercentageMiddlewares = [
  validateUserIdMiddleware,
  param('userId', 'El id del usuario no es válido').isLength({ min: 30 }),
  body('percentage', 'Los porcentaje que se incrementará debe de venir').custom(percentage => {
    if (typeof percentage !== 'number') return;
    if (percentage > 1 || percentage < 0) return;
    return percentage;
  }),
  fieldValidatorMiddleware
];
