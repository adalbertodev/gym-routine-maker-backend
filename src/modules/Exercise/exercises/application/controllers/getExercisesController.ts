import { Request, Response } from 'express';

import { ExerciseConnectionManager } from '../../infrastructure/persistence/ExerciseConnectionManager';
import { getExercises } from '../use-cases/getExercises';
import { ExerciseResponse } from '../interfaces';
import { exerciseToResponseExercise } from '../utils';

export const getExercisesController = async(
  req: Request,
  res: Response<ExerciseResponse>
) => {
  try {
    const repository = ExerciseConnectionManager.connect();

    const exercises = await getExercises(repository);
    const responseExercises = exercises.map((exercise) =>
      exerciseToResponseExercise(exercise, { id: true })
    );

    await ExerciseConnectionManager.disconnect();
    return res.status(200).json({ data: responseExercises, error: null });
  } catch (error: any) {
    await ExerciseConnectionManager.disconnect();
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
