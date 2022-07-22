import jwt from 'jsonwebtoken';

import { UserResponse } from '../User';

export class JWT {
  public static signToken = (userResponse: UserResponse) => {
    if (!process.env.JWT_SECRET_SEED) {
      throw new Error('No hay semilla de JWT');
    }

    const payload = { ...userResponse };

    return jwt.sign(payload, process.env.JWT_SECRET_SEED, { expiresIn: '7d' });
  };

  public static renewToken = (token: string) => {
    if (!process.env.JWT_SECRET_SEED) {
      throw new Error('No hay semilla de JWT');
    }

    const decodedToken = jwt.decode(token, { complete: true });
    if (!decodedToken?.payload) throw new Error('El token ha sido dañado');

    const { id, name, email, role } = decodedToken.payload as UserResponse;
    const payload = { id, name, email, role };

    return jwt.sign(payload, process.env.JWT_SECRET_SEED, { expiresIn: '7d' });
  };

  public static isValidToken = (token: string) => {
    if (!process.env.JWT_SECRET_SEED) {
      throw new Error('No hay semilla de JWT');
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED);
    } catch (error: any) {
      throw new Error('JWT no es válido');
    }
  };
}
