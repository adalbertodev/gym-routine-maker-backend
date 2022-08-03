import { Request, Response } from 'express';
import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError';
import { ExerciseId } from '../../domain/Exercise';
import { ExerciseConnectionManager } from '../../infrastructure/persistence/ExerciseConnectionManager';
import { ExerciseResponse } from '../interfaces';
import { getExercise } from '../use-cases/getExercise';
import { exerciseToResponseExercise } from '../utils';

export const getExerciseController = async(
  req: Request,
  res: Response<ExerciseResponse>
) => {
  const { id } = req.params;

  try {
    const repository = ExerciseConnectionManager.connect();

    const exercise = await getExercise(new ExerciseId(id), repository);
    const responseExercise = exerciseToResponseExercise(exercise, { id: true });

    await ExerciseConnectionManager.disconnect();
    return res.status(200).json({ data: responseExercise, error: null });
  } catch (error: any) {
    await ExerciseConnectionManager.disconnect();

    if (error instanceof InvalidArgumentError) {
      const { message } = error;
      return res.status(400).json({ data: null, error: { message } });
    }

    console.log(error);
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
