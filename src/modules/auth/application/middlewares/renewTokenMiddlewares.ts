import { verifyTokenMiddleware } from '../../../shared/application/middlewares/verifyTokenMiddleware';

export const renewTokenMiddlewares = [
  verifyTokenMiddleware
];
