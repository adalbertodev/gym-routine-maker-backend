import { validateUserIdMiddleware, verifyIsAdminMiddleware } from '../../../Shared/application/middlewares';

export const getUsersMiddlewares = [
  verifyIsAdminMiddleware
];

export const updateUserMiddlewares = [
  validateUserIdMiddleware
];

export const deleteUserMiddlewares = [
  verifyIsAdminMiddleware
];
