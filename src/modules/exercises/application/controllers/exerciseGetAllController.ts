import { Request, Response } from 'express';

import { ExerciseConnectionManager } from '../../infrastructure/persistence/ExerciseConnectionManager';
import { getAllExercises } from '../use-cases/getAllExercises';
import { ExerciseResponse } from '../interfaces';
import { exerciseToResponseExercise } from '../utils';

export const exerciseGetAllController = async(
  req: Request,
  res: Response<ExerciseResponse>
) => {
  try {
    const repository = ExerciseConnectionManager.connect();

    const exercises = await getAllExercises(repository);
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
