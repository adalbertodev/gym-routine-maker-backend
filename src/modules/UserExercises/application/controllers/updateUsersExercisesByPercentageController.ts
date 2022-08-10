import { Response } from 'express';

import { convertToResponseUserExercises } from '../utils/convertToResponseUserExercises';
import { TypedRequest } from '../../../Shared/application/interfaces/TypedRequest';
import { UpdateUserExerciseRequestBody } from '../interfaces';
import { updateUserExercisesRmByPercentage } from '../use-cases/updateUserExercisesRmByPercentage';
import { UserExercisesConnectionManager } from '../../infrastructure/persistence/UserExercisesConnectionManager';
import { UserExercisesNotExist } from '../../domain/Errors/UserExercisesNotExist';
import { UserExercisesResponse } from '../interfaces/UserExercisesResponse';
import { UserId } from '../../../Shared/domain/UserId';

export const updateUsersExercisesByPercentageController = async(
  req: TypedRequest<UpdateUserExerciseRequestBody>,
  res: Response<UserExercisesResponse>
) => {
  const { userId } = req.params;
  const { percentage } = req.body;

  try {
    const repository = UserExercisesConnectionManager.connect();

    const newUserExercises = await updateUserExercisesRmByPercentage(new UserId(userId), percentage, repository);
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
