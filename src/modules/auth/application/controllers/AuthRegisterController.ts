import { Request, Response } from 'express';

import { AuthResponse } from '../interfaces';
import { ConnectionManager } from '../../infrastructure/persistence/ConnectionManager';
import { registerUser } from '../use-cases/registerUser';
import { signToken, userToResponse } from '../utils';
import { UserAlreadyExists } from '../../domain/Errors';

export const authRegisterController = async(req: Request, res: Response<AuthResponse>) => {
  const { name, email, password, repeatedPassword } = req.body;

  try {
    const repository = ConnectionManager.mongoConnect();

    const user = await registerUser(repository, { name, email, password, repeatedPassword });
    const userResponse = userToResponse(user);
    const token = signToken(userResponse);

    await ConnectionManager.mongoDisconnect();
    return res.status(200).json({ data: { user: userResponse, token }, error: null });
  } catch (error: any) {
    await ConnectionManager.mongoDisconnect();

    if (error instanceof UserAlreadyExists) {
      return res.status(400).json({ data: null, error: { message: error.message } });
    }
    console.log(error);
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
