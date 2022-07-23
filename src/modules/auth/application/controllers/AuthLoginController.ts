import { Request, Response } from 'express';

import { ConnectionManager } from '../../infrastructure/persistence/ConnectionManager';
import { Controller } from '../../../shared/application/interfaces/Controller';
import { ErrorResponse } from '../../../shared/application/interfaces/ErrorResponse';
import { LoginResponse } from '../interfaces/LoginResponse';
import { LoginUser } from '../use-cases/LoginUser';
import { FailedUserCredentials } from '../../domain/Errors';
import { UserResponse } from '../entities/UserResponse';
import { signToken } from '../utils/handleJwt';

export class AuthLoginController implements Controller {
  public run = async(req: Request, res: Response<LoginResponse | ErrorResponse>) => {
    const { email, password } = req.body;

    try {
      const repository = ConnectionManager.mongoConnect();

      const user = await new LoginUser(repository).run({ email, password });
      const userResponse = UserResponse.fromUser(user);
      const token = signToken(userResponse);

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
