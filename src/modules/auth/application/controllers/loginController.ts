import { Response } from 'express';

import { AuthResponse, LoginRequestBody } from '../interfaces';
import { FailedUserCredentials } from '../../domain/Errors';
import { loginUser } from '../use-cases/loginUser';
import { signToken, convertToResponseUser } from '../utils';
import { TypedRequest } from '../../../Shared/application/interfaces/TypedRequest';
import { UserConnectionManager } from '../../infrastructure/persistence/UserConnectionManager';

export const loginController = async(req: TypedRequest<LoginRequestBody>, res: Response<AuthResponse>) => {
  const loginBody = req.body;

  try {
    const repository = UserConnectionManager.connect();

    const user = await loginUser(loginBody, repository);
    const userResponse = convertToResponseUser(user);
    const token = signToken(userResponse);

    await UserConnectionManager.disconnect();
    return res.status(200).json({ user: userResponse, token });
  } catch (error: any) {
    await UserConnectionManager.disconnect();

    if (error instanceof FailedUserCredentials) {
      const { message } = error;
      return res.status(400).json({ error: { message } });
    }
    console.log(error);
    return res.status(500).json({ error: { message: error } });
  }
};
