import { Response } from 'express';

import { ExerciseAlreadyExists, ExerciseNotExist } from '../../domain/Errors';
import { SaveExerciseRequest, UserExercisesResponse } from '../interfaces';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { updateExercise } from '../use-cases/updateExercise';
import { Exercise } from '../../domain/UserExercises';
import { UserExercisesConnectionManager } from '../../infrastructure/persistence/UserExercisesConnectionManager';
import { UserId } from '../../../Shared/domain/UserId';
import { convertToResponseUserExercises } from '../utils';

export const updateExerciseController = async(
  req: SaveExerciseRequest,
  res: Response<UserExercisesResponse>) => {
  const { id, userId } = req.params;
  const exerciseBody = req.body;
  const exercise = Exercise.fromPrimitives({ ...exerciseBody, _id: id });

  try {
    const repository = UserExercisesConnectionManager.connect();

    const newUserExercises = await updateExercise(new UserId(userId), exercise, repository);
    const responseUserExercises = convertToResponseUserExercises(newUserExercises);

    await UserExercisesConnectionManager.disconnect();
    return res.status(200).json({ data: responseUserExercises, error: null });
  } catch (error: any) {
    await UserExercisesConnectionManager.disconnect();

    if (error instanceof ExerciseAlreadyExists || error instanceof ExerciseNotExist) {
      return res.status(400).json({ data: null, error: { message: error.message } });
    }

    if (error instanceof InvalidArgumentError) {
      return res.status(400).json({ data: null, error: { message: error.message } });
    }

    console.log(error);
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
