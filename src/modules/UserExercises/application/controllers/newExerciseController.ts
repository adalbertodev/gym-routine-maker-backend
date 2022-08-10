import { Response } from 'express';

import { convertToResponseUserExercises } from '../utils';
import { ExerciseAlreadyExists } from '../../domain/Errors';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { newExercise } from '../use-cases/newExercise';
import { SaveExerciseRequestBody, UserExercisesResponse } from '../interfaces';
import { TypedRequest } from '../../../Shared/application/interfaces/TypedRequest';
import { UserExercisesConnectionManager } from '../../infrastructure/persistence/UserExercisesConnectionManager';
import { UserId } from '../../../Shared/domain/UserId';

export const newExerciseController = async(
  req: TypedRequest<SaveExerciseRequestBody>,
  res: Response<UserExercisesResponse>
) => {
  const exerciseBody = req.body;
  const { userId } = req.params;

  try {
    const repository = UserExercisesConnectionManager.connect();

    const newUserExercises = await newExercise(new UserId(userId), exerciseBody, repository);
    const responseUserExercises = convertToResponseUserExercises(newUserExercises);

    await UserExercisesConnectionManager.disconnect();
    return res.status(200).json({ data: responseUserExercises, error: null });
  } catch (error: any) {
    await UserExercisesConnectionManager.disconnect();

    if (error instanceof ExerciseAlreadyExists || error instanceof InvalidArgumentError) {
      return res.status(400).json({ data: null, error: { message: error.message } });
    }

    console.log(error);
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
