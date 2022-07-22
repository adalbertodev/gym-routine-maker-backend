import { Request, Response } from 'express';

import { Controller } from '../../shared/interfaces/Controller';
import { RegisterUser } from '../application/RegisterUser';
import { ConnectionManager } from '../infrastructure/persistence/ConnectionManager';
import { UserAlreadyExists } from '../domain/UserAlreadyExists';
import { ErrorResponse } from '../../shared/interfaces/ErrorResponse';
import { LoginResponse } from '../interfaces/LoginResponse';
import { UserResponse } from '../domain/UserResponse';

export class AuthRegisterController implements Controller {
  public run = async(req: Request, res: Response<LoginResponse | ErrorResponse>) => {
    const { name, email, password, repeatedPassword } = req.body;

    try {
      const repository = ConnectionManager.mongoConnect();

      const user = await new RegisterUser(repository).run({ name, email, password, repeatedPassword });
      const userResponse = UserResponse.fromUser(user);

      await ConnectionManager.mongoDisconnect();
      return res.status(200).json({ user: userResponse, token: '' });
    } catch (error: any) {
      await ConnectionManager.mongoDisconnect();

      if (error instanceof UserAlreadyExists) {
        return res.status(400).json({ error: error.message });
      }
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
