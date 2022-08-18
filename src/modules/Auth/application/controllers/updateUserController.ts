import { Response } from 'express';

import { convertToResponseUser } from '../utils';
import { TypedRequest } from '../../../Shared/application/interfaces/TypedRequest';
import { UserConnectionManager } from '../../infrastructure/persistence/UserConnectionManager';
import { UserResponse } from '../interfaces';
import { UserPrimitive } from '../../domain/interfaces';
import { updateUser } from '../use-cases/updateUser';
import { User } from '../../domain/User';

export const updateUserController = async(req: TypedRequest<UserPrimitive>, res: Response<UserResponse>) => {
  const { userId } = req.params;
  const userPrimitive = req.body;
  const userBody = User.fromPrimitives({ ...userPrimitive, _id: userId });

  try {
    const repository = UserConnectionManager.connect();

    const user = await updateUser(userBody, repository);
    const responseUser = convertToResponseUser(user);

    await UserConnectionManager.disconnect();
    return res.status(200).json({ data: responseUser });
  } catch (error: any) {
    await UserConnectionManager.disconnect();
    return res.status(500).json({ error: { message: error } });
  }
};
