import { Response } from 'express';

import { convertToResponseUserExercises } from '../utils/convertToResponseUserExercises';
import { getUsersExercises } from '../use-cases/getUsersExercises';
import { TypedRequest } from '../../../Shared/application/interfaces/TypedRequest';
import { UserExercisesConnectionManager } from '../../infrastructure/persistence/UserExercisesConnectionManager';
import { UserExercisesResponse } from '../interfaces';

export const getUsersExercisesController = async(req: TypedRequest<any>, res: Response<UserExercisesResponse>) => {
  try {
    const repository = UserExercisesConnectionManager.connect();

    const usersExercises = await getUsersExercises(repository);

    const responseUsersExercises = usersExercises.map(usersExercises => convertToResponseUserExercises(usersExercises));

    await UserExercisesConnectionManager.disconnect();
    return res.status(200).json({ data: responseUsersExercises, error: null });
  } catch (error: any) {
    await UserExercisesConnectionManager.disconnect();
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
