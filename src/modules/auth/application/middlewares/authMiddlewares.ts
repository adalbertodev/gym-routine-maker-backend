import { body } from 'express-validator';

import { fieldValidatorMiddleware, verifyTokenMiddleware } from '../../../Shared/application/middlewares';

export const loginMiddlewares = [
  body('email', 'El email no es válido').isEmail(),
  body('password', 'La contraseña debe de tener al menos 8 carácteres').isLength({ min: 8 }),
  fieldValidatorMiddleware
];

export const registerMiddlewares = [
  body('name', 'El nombre debe de tener al menos 3 carácteres').isLength({ min: 3 }),
  body('email', 'El email no es válido').isEmail(),
  body('password', 'La contraseña debe de tener al menos 8 carácteres').isLength({ min: 8 }),
  fieldValidatorMiddleware
];

export const renewTokenMiddlewares = [
  verifyTokenMiddleware
];
