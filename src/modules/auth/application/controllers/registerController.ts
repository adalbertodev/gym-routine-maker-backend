import { Response } from 'express';

import { AuthResponse, RegisterRequest } from '../interfaces';
import { UserConnectionManager } from '../../infrastructure/persistence/UserConnectionManager';
import { registerUser } from '../use-cases/registerUser';
import { signToken, userToResponseUser } from '../utils';
import { UserAlreadyExists } from '../../domain/Errors';

export const registerController = async(req: RegisterRequest, res: Response<AuthResponse>) => {
  const registerBody = req.body;

  try {
    const repository = UserConnectionManager.connect();

    const user = await registerUser(registerBody, repository);
    const userResponse = userToResponseUser(user);
    const token = signToken(userResponse);

    await UserConnectionManager.disconnect();
    return res.status(200).json({ data: { user: userResponse, token }, error: null });
  } catch (error: any) {
    await UserConnectionManager.disconnect();

    if (error instanceof UserAlreadyExists) {
      return res.status(400).json({ data: null, error: { message: error.message } });
    }
    console.log(error);
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
