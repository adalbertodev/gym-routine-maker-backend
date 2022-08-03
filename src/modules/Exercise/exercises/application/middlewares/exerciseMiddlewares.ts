import { body, param } from 'express-validator';

import { verifyIsAdminMiddleware, validateUserIdMiddleware, fieldValidatorMiddleware } from '../../../../Shared/application/middlewares';
import { ExerciseMuscles } from '../../domain/interfaces/ExerciseMuscles';

export const getExercisesMiddlewares = [
  verifyIsAdminMiddleware
];

export const getExercisesByUserMiddlewares = [
  validateUserIdMiddleware
];

export const getExerciseMiddlewares = [
  verifyIsAdminMiddleware
];

export const newExerciseMiddlewares = [
  validateUserIdMiddleware,
  body('userId', 'El id del usuario no es válido').custom((value) => value === null || value.length > 0),
  body('name', 'El nombre debe de tener al menos 3 carácteres').isLength({ min: 3 }),
  body('muscle', 'El músculo no es válido').isIn(Object.values(ExerciseMuscles)),
  body('barWeight', 'El peso de la barra no es válido').custom((value) => value === null || value >= 0),
  body('rm', 'El rm no es válido').custom((value) => value === null || value >= 0),
  fieldValidatorMiddleware
];

export const updateExerciseMiddlewares = [
  validateUserIdMiddleware,
  param('id', 'El id no es válido').isLength({ min: 30 }),
  body('userId', 'El id del usuario no es válido').custom((value) => value === null || value.length > 0),
  body('name', 'El nombre debe de tener al menos 3 carácteres').isLength({ min: 3 }),
  body('muscle', 'El músculo no es válido').isIn(Object.values(ExerciseMuscles)),
  body('barWeight', 'El peso de la barra no es válido').custom((value) => value === null || value >= 0),
  body('rm', 'El rm no es válido').custom((value) => value === null || value >= 0),
  fieldValidatorMiddleware
];

export const deleteExerciseMiddlewares = [
  verifyIsAdminMiddleware
];
