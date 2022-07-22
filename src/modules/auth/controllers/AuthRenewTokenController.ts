import { Request, Response } from 'express';

import { Controller } from '../../shared/interfaces/Controller';
import { ErrorResponse } from '../../shared/interfaces/ErrorResponse';
import { FailedUserCredentials } from '../domain/User';
import { JWT } from '../domain/JWT';
import { TokenResponse } from '../interfaces/TokenResponse';

export class AuthRenewTokenController implements Controller {
  public run = async(req: Request, res: Response<TokenResponse | ErrorResponse>) => {
    const { sessionToken } = req.cookies;

    try {
      const token = await JWT.renewToken(sessionToken);

      return res.status(200).json({ token });
    } catch (error: any) {
      if (error instanceof FailedUserCredentials) {
        return res.status(400).json({ error: error.message });
      }
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
