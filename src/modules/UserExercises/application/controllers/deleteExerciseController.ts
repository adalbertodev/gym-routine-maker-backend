import { Request, Response } from 'express';
import { UserId } from '../../../Shared/domain/UserId';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { ExerciseId } from '../../domain/UserExercises';
import { UserExercisesConnectionManager } from '../../infrastructure/persistence/UserExercisesConnectionManager';
import { UserExercisesResponse } from '../interfaces';
import { deleteExercise } from '../use-cases/deleteExercise';
import { convertToResponseUserExercises } from '../utils';

export const deleteExerciseController = async(
  req: Request,
  res: Response<UserExercisesResponse>
) => {
  const { id, userId } = req.params;

  try {
    const repository = UserExercisesConnectionManager.connect();

    const exercise = await deleteExercise(new UserId(userId), new ExerciseId(id), repository);
    const responseUserExercises = convertToResponseUserExercises(exercise);

    await UserExercisesConnectionManager.disconnect();
    return res.status(200).json({ data: responseUserExercises, error: null });
  } catch (error: any) {
    await UserExercisesConnectionManager.disconnect();

    if (error instanceof InvalidArgumentError) {
      const { message } = error;
      return res.status(400).json({ data: null, error: { message } });
    }

    console.log(error);
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
