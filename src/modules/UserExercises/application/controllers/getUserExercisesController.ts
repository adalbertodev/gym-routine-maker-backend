import { Response } from 'express';

import { convertToResponseUserExercises } from '../utils/convertToResponseUserExercises';
import { getUserExercises } from '../use-cases/getUserExercises';
import { TypedRequest } from '../../../Shared/application/interfaces/TypedRequest';
import { UserExercisesConnectionManager } from '../../infrastructure/persistence/UserExercisesConnectionManager';
import { UserExercisesNotExist } from '../../domain/Errors/UserExercisesNotExist';
import { UserExercisesResponse } from '../interfaces/UserExercisesResponse';
import { UserId } from '../../../Shared/domain/UserId';

export const getUserExercisesController = async(req: TypedRequest<any>, res: Response<UserExercisesResponse>) => {
  const { userId } = req.params;

  try {
    const repository = UserExercisesConnectionManager.connect();

    const userExercises = await getUserExercises(new UserId(userId), repository);
    const responseUserExercises = convertToResponseUserExercises(userExercises);

    await UserExercisesConnectionManager.disconnect();
    return res.status(200).json({ data: responseUserExercises, error: null });
  } catch (error: any) {
    await UserExercisesConnectionManager.disconnect();

    if (error instanceof UserExercisesNotExist) {
      const { message } = error;
      return res.status(400).json({ data: null, error: { message } });
    }

    console.log(error);
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
