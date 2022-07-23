import { Request, Response } from 'express';

import { AuthResponse } from '../interfaces';
import { ConnectionManager } from '../../../shared/infrastructure/persistence/ConnectionManager';
import { userToResponseUser } from '../utils';
import { UserAlreadyExists } from '../../domain/Errors';
import { generateSeedData } from '../use-cases/generateSeedData';

export const authSeedDataController = async(req: Request, res: Response<AuthResponse>) => {
  try {
    const repository = ConnectionManager.connect();

    const users = await generateSeedData(repository);
    const responseUsers = users.map((user) => userToResponseUser(user));

    await ConnectionManager.disconnect();
    return res.status(200).json({ data: { users: responseUsers }, error: null });
  } catch (error: any) {
    await ConnectionManager.disconnect();

    if (error instanceof UserAlreadyExists) {
      return res.status(400).json({ data: null, error: { message: error.message } });
    }
    console.log(error);
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
