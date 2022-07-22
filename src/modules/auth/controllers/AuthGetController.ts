import { Request, Response } from 'express';

import { Controller } from '../../shared/interfaces/Controller';
import { ErrorResponse } from '../../shared/interfaces/ErrorResponse';
import { GetAllUsers } from '../application/GetAllUsers';
import { UserResponse } from '../domain/UserResponse';
import { ConnectionManager } from '../infrastructure/persistence/ConnectionManager';
import { GetResponse } from '../interfaces/GetResponse';

export class AuthGetController implements Controller {
  public run = async(req: Request, res: Response<GetResponse | ErrorResponse>) => {
    try {
      const repository = ConnectionManager.mongoConnect();

      const users = await new GetAllUsers(repository).run();
      const usersResponse = users.map((user) => UserResponse.fromUser(user));

      await ConnectionManager.mongoDisconnect();
      return res.status(200).json({ data: usersResponse });
    } catch (error: any) {
      await ConnectionManager.mongoDisconnect();
      return res.status(500).json(error);
    }
  };
}
