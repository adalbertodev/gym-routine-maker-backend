import { Request, Response, NextFunction } from 'express';

import { isValidToken } from '../../../Auth/application/utils';
import { ResponseUser } from '../../../Auth/application/interfaces';
import { UserRoles } from '../../../Auth/domain/interfaces';

export const verifyIsAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sessionToken } = req.cookies;

  if (!sessionToken) return res.status(401).json({ error: 'No hay token en la request' });

  try {
    const { id, role } = isValidToken(sessionToken) as ResponseUser;

    if (role !== UserRoles.ADMIN) return res.status(401).json({ error: 'Acceso no autorizado' });

    req.params = { ...req.params, userId: id };
  } catch (error: any) {
    return res.status(401).json({ error: 'Token no válido' });
  }
  next();
};
