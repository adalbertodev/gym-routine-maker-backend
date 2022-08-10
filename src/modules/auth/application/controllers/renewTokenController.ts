import { Response } from 'express';

import { AuthResponse } from '../interfaces';
import { FailedUserCredentials } from '../../domain/Errors';
import { renewToken } from '../utils';
import { TypedRequest } from '../../../Shared/application/interfaces/TypedRequest';

export const renewTokenController = (req: TypedRequest<any>, res: Response<AuthResponse>) => {
  const { sessionToken } = req.cookies;

  try {
    const token = renewToken(sessionToken);

    return res.status(200).json({ token });
  } catch (error: any) {
    if (error instanceof FailedUserCredentials) {
      return res.status(400).json({ error: { message: error.message } });
    }
    console.log(error);
    return res.status(500).json({ error: { message: error } });
  }
};
