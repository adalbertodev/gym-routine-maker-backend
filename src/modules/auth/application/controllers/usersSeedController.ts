import { Request, Response } from 'express';

import { AuthResponse } from '../interfaces';
import { UserConnectionManager } from '../../infrastructure/persistence/UserConnectionManager';
import { userToResponseUser } from '../utils';
import { UserAlreadyExists } from '../../domain/Errors';
import { userSeed } from '../use-cases/usersSeed';

export const usersSeedController = async(req: Request, res: Response<AuthResponse>) => {
  try {
    const repository = UserConnectionManager.connect();

    const users = await userSeed(repository);
    const responseUsers = users.map((user) => userToResponseUser(user));

    await UserConnectionManager.disconnect();
    return res.status(200).json({ data: { users: responseUsers }, error: null });
  } catch (error: any) {
    await UserConnectionManager.disconnect();

    if (error instanceof UserAlreadyExists) {
      return res.status(400).json({ data: null, error: { message: error.message } });
    }
    console.log(error);
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
