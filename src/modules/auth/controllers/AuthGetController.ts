import { Request, Response } from 'express';

import { Controller } from '../../shared/interfaces/Controller';
import { GetAllUsers } from '../application/GetAllUsers';
import { ConnectionManager } from '../infrastructure/persistence/ConnectionManager';

export class AuthGetController implements Controller {
  public run = async(req: Request, res: Response) => {
    try {
      const repository = ConnectionManager.mongoConnect();

      const users = await new GetAllUsers(repository).run();
      const usersPrimitive = users.map((user) => user.toPrimitives());

      return res.status(200).json(usersPrimitive);
    } catch (error: any) {
      return res.status(500).json(error);
    }
  };
}
