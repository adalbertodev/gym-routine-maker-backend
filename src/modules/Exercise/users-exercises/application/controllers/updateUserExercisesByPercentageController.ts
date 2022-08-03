import { Response } from 'express';

import { populateUserExercises } from '../use-cases/populateUserExercises';
import { UserExercisesConnectionManager } from '../../infrastructure/persistence/UserExercisesConnectionManager';
import { UserExercisesNotExist } from '../../domain/Errors/UserExercisesNotExist';
import { UserExercisesResponse } from '../interfaces/UserExercisesResponse';
import { userExercisesToResponseUserExercises } from '../utils/userExercisesToResponseUserExercises';
import { UserId } from '../../../../Shared/domain/UserId';
import { updateUserExercisesByPercentage } from '../use-cases/updateUserExercisesByPercentage';
import { UpdateUserExerciseByPercentageRequest } from '../interfaces';

export const updateUserExercisesByPercentageController = async(req: UpdateUserExerciseByPercentageRequest, res: Response<UserExercisesResponse>) => {
  const { userId } = req.params;
  const { percentage } = req.body;

  const id = new UserId(userId);

  try {
    const repository = UserExercisesConnectionManager.connect();

    const newUserExercises = await updateUserExercisesByPercentage(id, repository, percentage);
    const populatedNewUserExercises = await populateUserExercises(newUserExercises, repository);
    const responseUserExercises = userExercisesToResponseUserExercises(populatedNewUserExercises);

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
