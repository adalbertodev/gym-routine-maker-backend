import { Request, Response, NextFunction } from 'express';
import { JWT } from '../../auth/domain/JWT';
import { UserResponse } from '../../auth/domain/User';

export const validateAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sessionToken } = req.cookies;

  if (!sessionToken) return res.status(401).json({ error: 'No hay token en la request' });

  try {
    const { id, role } = JWT.isValidToken(sessionToken) as UserResponse;

    if (role !== 'admin') return res.status(401).json({ error: 'Acceso no autorizado' });

    req.body = { ...req.body, id };
  } catch (error: any) {
    return res.status(401).json({ error: 'Token no válido' });
  }
  next();
};
