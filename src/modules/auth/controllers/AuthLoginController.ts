import { Request, Response } from 'express';

import { ConnectionManager } from '../infrastructure/persistence/ConnectionManager';
import { Controller } from '../../shared/interfaces/Controller';
import { ErrorResponse } from '../../shared/interfaces/ErrorResponse';
import { FailedUserCredentials, UserResponse } from '../domain/User';
import { LoginResponse } from '../interfaces/LoginResponse';
import { LoginUser } from '../application/LoginUser';
import { JWT } from '../domain/JWT';

export class AuthLoginController implements Controller {
  public run = async(req: Request, res: Response<LoginResponse | ErrorResponse>) => {
    const { email, password } = req.body;

    try {
      const repository = ConnectionManager.mongoConnect();

      const user = await new LoginUser(repository).run({ email, password });
      const userResponse = UserResponse.fromUser(user);
      const token = JWT.signToken(userResponse);

      await ConnectionManager.mongoDisconnect();
      return res.status(200).json({ user: userResponse, token });
    } catch (error: any) {
      await ConnectionManager.mongoDisconnect();

      if (error instanceof FailedUserCredentials) {
        return res.status(400).json({ error: error.message });
      }
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
