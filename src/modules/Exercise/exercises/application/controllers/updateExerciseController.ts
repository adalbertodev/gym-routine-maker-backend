import { Response } from 'express';

import { ExerciseAlreadyExists, ExerciseNotExist } from '../../domain/Errors';
import { ExerciseConnectionManager } from '../../infrastructure/persistence/ExerciseConnectionManager';
import { ExerciseResponse, SaveExerciseRequest } from '../interfaces';
import { exerciseToResponseExercise } from '../utils';
import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError';
import { updateExercise } from '../use-cases/updateExercise';
import { Exercise } from '../../domain/Exercise';

export const updateExerciseController = async(
  req: SaveExerciseRequest,
  res: Response<ExerciseResponse>) => {
  const { id } = req.params;
  const exerciseBody = req.body;
  const exercise = Exercise.fromPrimitives({ ...exerciseBody, _id: id });

  try {
    const repository = ExerciseConnectionManager.connect();

    const newExercise = await updateExercise(exercise, repository);
    const responseExercise = exerciseToResponseExercise(newExercise);

    await ExerciseConnectionManager.disconnect();
    return res.status(200).json({ data: responseExercise, error: null });
  } catch (error: any) {
    await ExerciseConnectionManager.disconnect();

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
