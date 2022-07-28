import { Request, Response } from 'express';

import { AuthResponse } from '../interfaces';
import { UserConnectionManager } from '../../infrastructure/persistence/UserConnectionManager';
import { getUsers } from '../use-cases/getUsers';
import { userToResponseUser } from '../utils/userToResponse';

export const getUsersController = async(req: Request, res: Response<AuthResponse>) => {
  try {
    const repository = UserConnectionManager.connect();

    const users = await getUsers(repository);
    const responseUsers = users.map((user) => userToResponseUser(user));

    await UserConnectionManager.disconnect();
    return res.status(200).json({ data: { users: responseUsers }, error: null });
  } catch (error: any) {
    await UserConnectionManager.disconnect();
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
