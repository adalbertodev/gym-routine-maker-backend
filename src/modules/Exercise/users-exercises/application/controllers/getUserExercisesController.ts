import { Request, Response } from 'express';

import { getUserExercises } from '../use-cases/getUserExercises';
import { populateUserExercises } from '../use-cases/populateUserExercises';
import { UserExercisesConnectionManager } from '../../infrastructure/persistence/UserExercisesConnectionManager';
import { UserExercisesNotExist } from '../../domain/Errors/UserExercisesNotExist';
import { UserExercisesResponse } from '../interfaces/UserExercisesResponse';
import { userExercisesToResponseUserExercises } from '../utils/userExercisesToResponseUserExercises';
import { UserId } from '../../../../Shared/domain/UserId';

export const getUserExercisesController = async(
  req: Request,
  res: Response<UserExercisesResponse>
) => {
  const { userId } = req.params;

  try {
    const repository = UserExercisesConnectionManager.connect();

    const userExercises = await getUserExercises(new UserId(userId), repository);
    const populatedUserExercises = await populateUserExercises(userExercises, repository);
    const responseUserExercises = userExercisesToResponseUserExercises(populatedUserExercises);

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
