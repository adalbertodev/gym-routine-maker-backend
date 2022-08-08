import { Response } from 'express';

import { UserExercisesConnectionManager } from '../../infrastructure/persistence/UserExercisesConnectionManager';
import { UserExercisesNotExist } from '../../domain/Errors/UserExercisesNotExist';
import { UserExercisesResponse } from '../interfaces/UserExercisesResponse';
import { convertToResponseUserExercises } from '../utils/convertToResponseUserExercises';
import { UserId } from '../../../Shared/domain/UserId';
import { updateUserExercisesByPercentage } from '../use-cases/updateUserExercisesByPercentage';
import { UpdateUserExerciseByPercentageRequest } from '../interfaces';

export const updateUsersExercisesByPercentageController = async(req: UpdateUserExerciseByPercentageRequest, res: Response<UserExercisesResponse>) => {
  const { userId } = req.params;
  const { percentage } = req.body;

  try {
    const repository = UserExercisesConnectionManager.connect();

    const newUserExercises = await updateUserExercisesByPercentage(new UserId(userId), repository, percentage);
    const responseUserExercises = convertToResponseUserExercises(newUserExercises);

    await UserExercisesConnectionManager.disconnect();
    return res.status(200).json({ data: responseUserExercises, error: null });
  } catch (error: any) {
    await UserExercisesConnectionManager.disconnect();

    if (error instanceof UserExercisesNotExist) {
      return res.status(400).json({ data: null, error: { message: error.message } });
    }

    console.log(error);
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
