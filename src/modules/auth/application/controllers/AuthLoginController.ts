import { Response } from 'express';

import { AuthResponse, LoginRequest } from '../interfaces';
import { UserConnectionManager } from '../../infrastructure/persistence/UserConnectionManager';
import { FailedUserCredentials } from '../../domain/Errors';
import { loginUser } from '../use-cases/loginUser';
import { signToken, userToResponseUser } from '../utils';

export const authLoginController = async(req: LoginRequest, res: Response<AuthResponse>) => {
  const loginBody = req.body;

  try {
    const repository = UserConnectionManager.connect();

    const user = await loginUser(loginBody, repository);
    const userResponse = userToResponseUser(user);
    const token = signToken(userResponse);

    await UserConnectionManager.disconnect();
    return res.status(200).json({ data: { user: userResponse, token }, error: null });
  } catch (error: any) {
    await UserConnectionManager.disconnect();

    if (error instanceof FailedUserCredentials) {
      const { message } = error;
      return res.status(400).json({ data: null, error: { message } });
    }
    console.log(error);
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
