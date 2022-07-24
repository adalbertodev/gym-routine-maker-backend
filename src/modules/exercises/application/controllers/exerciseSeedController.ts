import { Request, Response } from 'express';

import { ExerciseResponse } from '../interfaces';
import { ExerciseConnectionManager } from '../../infrastructure/persistence/ExerciseConnectionManager';
import { ExerciseAlreadyExists } from '../../domain/Errors';
import { exerciseSeed } from '../use-cases/exerciseSeed';
import { exerciseToResponseExercise } from '../utils';

export const exerciseSeedController = async(
  req: Request,
  res: Response<ExerciseResponse>
) => {
  try {
    const repository = ExerciseConnectionManager.connect();

    const exercises = await exerciseSeed(repository);
    const responseExercises = exercises.map((exercise) =>
      exerciseToResponseExercise(exercise, { id: true })
    );

    await ExerciseConnectionManager.disconnect();
    return res.status(200).json({ data: responseExercises, error: null });
  } catch (error: any) {
    await ExerciseConnectionManager.disconnect();

    if (error instanceof ExerciseAlreadyExists) {
      return res.status(400).json({ data: null, error: { message: error.message } });
    }
    console.log(error);
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
