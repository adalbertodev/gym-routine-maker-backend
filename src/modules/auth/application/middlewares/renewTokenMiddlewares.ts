import { verifyTokenMiddleware } from '../../../shared/application/middlewares';

export const renewTokenMiddlewares = [
  verifyTokenMiddleware
];
