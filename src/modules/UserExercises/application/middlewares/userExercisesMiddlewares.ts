import { body, param } from 'express-validator';
import {
  fieldValidatorMiddleware,
  validateUserIdMiddleware,
  verifyIsAdminMiddleware
} from '../../../Shared/application/middlewares';
import { ExerciseMuscles } from '../../domain/interfaces';

export const getUsersExercisesMiddlewares = [verifyIsAdminMiddleware];

export const getUserExercisesMiddlewares = [validateUserIdMiddleware];

export const newExerciseMiddlewares = [
  validateUserIdMiddleware,
  param('userId', 'El id del usuario no es válido').isLength({ min: 30 }),
  body('name', 'El nombre debe de tener al menos 3 carácteres').isLength({ min: 3 }),
  body('muscle', 'El músculo no es válido').isIn(Object.values(ExerciseMuscles)),
  body('barWeight', 'El peso de la barra no es válido').custom((value) => value === null || value >= 0),
  body('rm', 'El rm no es válido').custom((value) => value === null || value >= 0),
  fieldValidatorMiddleware
];

export const updateExerciseMiddlewares = [
  validateUserIdMiddleware,
  param('id', 'El id no es válido').isLength({ min: 30 }),
  param('userId', 'El id del usuario no es válido').isLength({ min: 30 }),
  body('name', 'El nombre debe de tener al menos 3 carácteres').isLength({ min: 3 }),
  body('muscle', 'El músculo no es válido').isIn(Object.values(ExerciseMuscles)),
  body('barWeight', 'El peso de la barra no es válido').custom((value) => value === null || value >= 0),
  body('rm', 'El rm no es válido').custom((value) => value === null || value >= 0),
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

export const deleteExerciseMiddlewares = [
  verifyIsAdminMiddleware
];
