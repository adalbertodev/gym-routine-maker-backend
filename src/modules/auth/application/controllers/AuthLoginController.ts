import { Request, Response } from 'express';

import { AuthResponse, UserResponse } from '../interfaces';
import { ConnectionManager } from '../../infrastructure/persistence/ConnectionManager';
import { FailedUserCredentials } from '../../domain/Errors';
import { loginUser } from '../use-cases/loginUser';
import { signToken, userToResponse } from '../utils';

export const authLoginController = async(req: Request, res: Response<AuthResponse>) => {
  const { email, password } = req.body;

  try {
    const repository = ConnectionManager.mongoConnect();

    const user = await loginUser(repository, { email, password });
    const userResponse: UserResponse = userToResponse(user);
    const token = signToken(userResponse);

    await ConnectionManager.mongoDisconnect();
    return res.status(200).json({ data: { user: userResponse, token }, error: null });
  } catch (error: any) {
    await ConnectionManager.mongoDisconnect();

    if (error instanceof FailedUserCredentials) {
      const { message } = error;
      return res.status(400).json({ data: null, error: { message } });
    }
    console.log(error);
    return res.status(500).json({ data: null, error: { message: error } });
  }
};