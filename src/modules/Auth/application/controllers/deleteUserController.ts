import { Response } from 'express';

import { convertToResponseUser } from '../utils';
import { TypedRequest } from '../../../Shared/application/interfaces/TypedRequest';
import { UserConnectionManager } from '../../infrastructure/persistence/UserConnectionManager';
import { UserResponse } from '../interfaces';
import { deleteUser } from '../use-cases/deleteUser';
import { UserId } from '../../../Shared/domain/UserId';

export const deleteUserController = async(req: TypedRequest<any>, res: Response<UserResponse>) => {
  const { userId } = req.params;

  try {
    const repository = UserConnectionManager.connect();

    const user = await deleteUser(new UserId(userId), repository);
    const responseUser = convertToResponseUser(user);

    await UserConnectionManager.disconnect();
    return res.status(200).json({ data: responseUser });
  } catch (error: any) {
    await UserConnectionManager.disconnect();
    return res.status(500).json({ error: { message: error } });
  }
};
