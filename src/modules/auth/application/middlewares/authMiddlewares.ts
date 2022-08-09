import { body } from 'express-validator';

import { fieldValidatorMiddleware, verifyTokenMiddleware } from '../../../Shared/application/middlewares';

export const loginMiddlewares = [
  body('email', 'El email no es válido').isEmail(),
  body('password', 'La contraseña debe de tener al menos 6 carácteres').isLength({ min: 6 }),
  fieldValidatorMiddleware
];

export const registerMiddlewares = [
  body('name', 'El nombre debe de tener al menos 3 carácteres').isLength({ min: 3 }),
  body('email', 'El email no es válido').isEmail(),
  body('password', 'La contraseña debe de tener al menos 6 carácteres').isLength({ min: 6 }),
  body('repeatedPassword', 'La contraseña debe de tener al menos 6 carácteres').isLength({ min: 6 }),
  fieldValidatorMiddleware
];

export const renewTokenMiddlewares = [
  verifyTokenMiddleware
];