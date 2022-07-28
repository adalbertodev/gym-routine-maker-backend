import { Request, Response } from 'express';
import { InvalidArgumentError } from '../../../shared/domain/value-object/InvalidArgumentError';
import { ExerciseId } from '../../domain/Exercise';
import { ExerciseConnectionManager } from '../../infrastructure/persistence/ExerciseConnectionManager';
import { ExerciseResponse } from '../interfaces';
import { deleteExercise } from '../use-cases/deleteExercise';
import { exerciseToResponseExercise } from '../utils';

export const deleteExerciseController = async(
  req: Request,
  res: Response<ExerciseResponse>
) => {
  const { id } = req.params;

  try {
    const repository = ExerciseConnectionManager.connect();

    const exercise = await deleteExercise(new ExerciseId(id), repository);
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
