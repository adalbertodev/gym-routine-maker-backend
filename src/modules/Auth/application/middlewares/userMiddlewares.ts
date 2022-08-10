import { verifyIsAdminMiddleware } from '../../../Shared/application/middlewares';

export const getUsersMiddlewares = [
  verifyIsAdminMiddleware
];
