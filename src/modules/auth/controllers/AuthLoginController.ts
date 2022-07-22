import { Request, Response } from 'express';

import { Controller } from '../../shared/interfaces/Controller';
import { LoginUser } from '../application/LoginUser';
import { FailedUserCredentials } from '../domain/FailedUserCredentials';
import { ConnectionManager } from '../infrastructure/persistence/ConnectionManager';
import { LoginResponse } from '../interfaces/LoginResponse';
import { ErrorResponse } from '../../shared/interfaces/ErrorResponse';
import { UserResponse } from '../domain/UserResponse';

export class AuthLoginController implements Controller {
  public run = async(req: Request, res: Response<LoginResponse | ErrorResponse>) => {
    const { email, password } = req.body;

    try {
      const repository = ConnectionManager.mongoConnect();

      const user = await new LoginUser(repository).run({ email, password });
      const userResponse = UserResponse.fromUser(user);

      await ConnectionManager.mongoDisconnect();
      return res.status(200).json({ user: userResponse, token: '' });
    } catch (error: any) {
      await ConnectionManager.mongoDisconnect();

      if (error instanceof FailedUserCredentials) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error });
    }
  };
}
