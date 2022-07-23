import { Request, Response } from 'express';

import { FailedUserCredentials } from '../../domain/Errors';
import { renewToken } from '../utils/handleJwt';
import { AuthResponse } from '../interfaces/AuthResponse';

export const authRenewTokenController = (req: Request, res: Response<AuthResponse>) => {
  const { sessionToken } = req.cookies;

  try {
    const token = renewToken(sessionToken);

    return res.status(200).json({ data: { token }, error: null });
  } catch (error: any) {
    if (error instanceof FailedUserCredentials) {
      return res.status(400).json({ data: null, error: { message: error.message } });
    }
    console.log(error);
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
