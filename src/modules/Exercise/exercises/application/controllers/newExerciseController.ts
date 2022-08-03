import { Response } from 'express';

import { createExercise } from '../use-cases/createExercise';
import { ExerciseAlreadyExists } from '../../domain/Errors';
import { ExerciseConnectionManager } from '../../infrastructure/persistence/ExerciseConnectionManager';
import { ExerciseResponse, SaveExerciseRequest } from '../interfaces';
import { exerciseToResponseExercise } from '../utils';
import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError';

export const newExerciseController = async(
  req: SaveExerciseRequest,
  res: Response<ExerciseResponse>) => {
  const exerciseBody = req.body;

  try {
    const repository = ExerciseConnectionManager.connect();

    const newExercise = await createExercise(exerciseBody, repository);
    const responseExercise = exerciseToResponseExercise(newExercise);

    await ExerciseConnectionManager.disconnect();
    return res.status(200).json({ data: responseExercise, error: null });
  } catch (error: any) {
    await ExerciseConnectionManager.disconnect();

    if (error instanceof ExerciseAlreadyExists || error instanceof InvalidArgumentError) {
      return res.status(400).json({ data: null, error: { message: error.message } });
    }

    console.log(error);
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
