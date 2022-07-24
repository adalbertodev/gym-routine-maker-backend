import { Request, Response } from 'express';

import { AuthResponse } from '../interfaces';
import { UserConnectionManager } from '../../infrastructure/persistence/UserConnectionManager';
import { getAllUsers } from '../use-cases/getAllUsers';
import { userToResponseUser } from '../utils/userToResponse';

export const authGetUsersController = async(req: Request, res: Response<AuthResponse>) => {
  try {
    const repository = UserConnectionManager.connect();

    const users = await getAllUsers(repository);
    const responseUsers = users.map((user) => userToResponseUser(user));

    await UserConnectionManager.disconnect();
    return res.status(200).json({ data: { users: responseUsers }, error: null });
  } catch (error: any) {
    await UserConnectionManager.disconnect();
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
