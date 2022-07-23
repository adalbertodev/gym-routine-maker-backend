import { Request, Response, NextFunction } from 'express';

import { isValidToken } from '../../../auth/application/utils';
import { UserResponse } from '../../../auth/application/interfaces';
import { UserRoles } from '../../../auth/domain/interfaces';

export const validateAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sessionToken } = req.cookies;

  if (!sessionToken) return res.status(401).json({ error: 'No hay token en la request' });

  try {
    const { id, role } = isValidToken(sessionToken) as UserResponse;

    if (role !== UserRoles.ADMIN) return res.status(401).json({ error: 'Acceso no autorizado' });

    req.body = { ...req.body, id };
  } catch (error: any) {
    return res.status(401).json({ error: 'Token no válido' });
  }
  next();
};
