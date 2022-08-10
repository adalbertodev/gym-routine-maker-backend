import { Response } from 'express';

import { convertToResponseUserExercises } from '../utils';
import { deleteExercise } from '../use-cases/deleteExercise';
import { ExerciseId } from '../../domain/UserExercises';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { TypedRequest } from '../../../Shared/application/interfaces/TypedRequest';
import { UserExercisesConnectionManager } from '../../infrastructure/persistence/UserExercisesConnectionManager';
import { UserExercisesResponse } from '../interfaces';
import { UserId } from '../../../Shared/domain/UserId';

export const deleteExerciseController = async(req: TypedRequest<any>, res: Response<UserExercisesResponse>) => {
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
