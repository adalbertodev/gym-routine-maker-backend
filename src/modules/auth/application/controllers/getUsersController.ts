import { Response } from 'express';

import { convertToResponseUser } from '../utils';
import { getUsers } from '../use-cases/getUsers';
import { TypedRequest } from '../../../Shared/application/interfaces/TypedRequest';
import { UserConnectionManager } from '../../infrastructure/persistence/UserConnectionManager';
import { UserResponse } from '../interfaces';

export const getUsersController = async(req: TypedRequest<any>, res: Response<UserResponse>) => {
  try {
    const repository = UserConnectionManager.connect();

    const users = await getUsers(repository);
    const responseUsers = users.map((user) => convertToResponseUser(user));

    await UserConnectionManager.disconnect();
    return res.status(200).json({ data: responseUsers });
  } catch (error: any) {
    await UserConnectionManager.disconnect();
    return res.status(500).json({ error: { message: error } });
  }
};
