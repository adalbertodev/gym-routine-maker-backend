import { Request, Response } from 'express';

import { AuthResponse } from '../interfaces';
import { ConnectionManager } from '../../../shared/infrastructure/persistence/ConnectionManager';
import { getAllUsers } from '../use-cases/getAllUsers';
import { userToResponseUser } from '../utils/userToResponse';

export const authGetUsersController = async(req: Request, res: Response<AuthResponse>) => {
  try {
    const repository = ConnectionManager.connect();

    const users = await getAllUsers(repository);
    const responseUsers = users.map((user) => userToResponseUser(user));

    await ConnectionManager.disconnect();
    return res.status(200).json({ data: { users: responseUsers }, error: null });
  } catch (error: any) {
    await ConnectionManager.disconnect();
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
