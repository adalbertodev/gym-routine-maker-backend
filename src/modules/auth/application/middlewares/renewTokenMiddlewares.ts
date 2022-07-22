import { verifyTokenMiddleware } from '../../../shared/middlewares/verifyTokenMiddleware';

export const renewTokenMiddlewares = [
  verifyTokenMiddleware
];
