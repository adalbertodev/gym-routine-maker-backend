import { Request, Response } from 'express';

import { AuthResponse } from '../interfaces';
import { ConnectionManager } from '../../infrastructure/persistence/ConnectionManager';
import { getAllUsers } from '../use-cases/getAllUsers';
import { userToResponse } from '../utils/userToResponse';

export const authGetUsersController = async(req: Request, res: Response<AuthResponse>) => {
  try {
    const repository = ConnectionManager.mongoConnect();

    const users = await getAllUsers(repository);
    const usersResponse = users.map((user) => userToResponse(user));

    await ConnectionManager.mongoDisconnect();
    return res.status(200).json({ data: { users: usersResponse }, error: null });
  } catch (error: any) {
    await ConnectionManager.mongoDisconnect();
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
