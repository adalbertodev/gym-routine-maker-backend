import { Request, Response, NextFunction } from 'express';

import { isValidToken } from '../../../auth/application/utils';
import { ResponseUser } from '../../../auth/application/interfaces';

export const verifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sessionToken } = req.cookies;

  if (!sessionToken) return res.status(401).json({ error: 'No hay token en la request' });

  try {
    const { id } = isValidToken(sessionToken) as ResponseUser;

    req.params = { ...req.params, userId: id };
  } catch (error: any) {
    return res.status(401).json({ error: 'Token no válido' });
  }
  next();
};
