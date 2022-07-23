import { Request, Response } from 'express';

import { FailedUserCredentials } from '../../domain/Errors';
import { ConnectionManager } from '../../infrastructure/persistence/ConnectionManager';
import { AuthResponse, UserResponse } from '../interfaces/AuthResponse';
import { loginUser } from '../use-cases/loginUser';
import { signToken } from '../utils/handleJwt';
import { userToResponse } from '../utils/userToResponse';

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
