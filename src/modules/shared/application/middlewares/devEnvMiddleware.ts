import { Request, Response, NextFunction } from 'express';

export const devEnvMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV !== 'dev') {
    return res.status(401).json({ error: 'No se esta en entorno de desarrollo' });
  }

  next();
};
