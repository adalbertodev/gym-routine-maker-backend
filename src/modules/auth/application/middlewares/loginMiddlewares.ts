import { body } from 'express-validator';

import { fieldValidatorMiddleware } from '../../../shared/middlewares/fieldValidatorMiddleware';

export const loginMiddlewares = [
  body('email', 'El email no es válido').isEmail(),
  body('password', 'La contraseña debe de tener al menos 6 carácteres').isLength({ min: 6 }),
  fieldValidatorMiddleware
];
