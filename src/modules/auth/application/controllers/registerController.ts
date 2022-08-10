import { Response } from 'express';

import { AuthResponse, RegisterRequestBody } from '../interfaces';
import { registerUser } from '../use-cases/registerUser';
import { signToken, convertToResponseUser } from '../utils';
import { TypedRequest } from '../../../Shared/application/interfaces/TypedRequest';
import { UserAlreadyExists } from '../../domain/Errors';
import { UserConnectionManager } from '../../infrastructure/persistence/UserConnectionManager';

export const registerController = async(req: TypedRequest<RegisterRequestBody>, res: Response<AuthResponse>) => {
  const registerBody = req.body;

  try {
    const repository = UserConnectionManager.connect();

    const user = await registerUser(registerBody, repository);
    const userResponse = convertToResponseUser(user);
    const token = signToken(userResponse);

    await UserConnectionManager.disconnect();
    return res.status(200).json({ user: userResponse, token });
  } catch (error: any) {
    await UserConnectionManager.disconnect();

    if (error instanceof UserAlreadyExists) {
      return res.status(400).json({ error: { message: error.message } });
    }
    console.log(error);
    return res.status(500).json({ error: { message: error } });
  }
};
