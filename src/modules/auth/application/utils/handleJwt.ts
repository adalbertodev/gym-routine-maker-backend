import jwt from 'jsonwebtoken';

import { UserResponse } from '../entities/UserResponse';

export const signToken = (userResponse: UserResponse) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No hay semilla de JWT');
  }

  const payload = { ...userResponse };

  return jwt.sign(payload, process.env.JWT_SECRET_SEED, { expiresIn: '7d' });
};

export const renewToken = (token: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No hay semilla de JWT');
  }

  const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_SEED);

  const { id, name, email, role } = decodedPayload as UserResponse;
  const payload = { id, name, email, role };

  return jwt.sign(payload, process.env.JWT_SECRET_SEED, { expiresIn: '7d' });
};

export const isValidToken = (token: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No hay semilla de JWT');
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET_SEED);
  } catch (error: any) {
    throw new Error('JWT no es válido');
  }
};
