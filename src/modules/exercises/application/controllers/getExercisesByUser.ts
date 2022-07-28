import { Request, Response } from 'express';

import { ExerciseConnectionManager } from '../../infrastructure/persistence/ExerciseConnectionManager';
import { ExerciseResponse } from '../interfaces';
import { exerciseToResponseExercise } from '../utils';
import { getExercisesByUser } from '../use-cases/getExercisesByUser';
import { UserId } from '../../../shared/domain/UserId';

export const getExercisesByUserController = async(
  req: Request,
  res: Response<ExerciseResponse>
) => {
  const { userId } = req.params;

  try {
    const repository = ExerciseConnectionManager.connect();

    const exercises = await getExercisesByUser(new UserId(userId), repository);
    const responseExercises = exercises.map((exercise) =>
      exerciseToResponseExercise(exercise)
    );

    await ExerciseConnectionManager.disconnect();
    return res.status(200).json({ data: responseExercises, error: null });
  } catch (error: any) {
    await ExerciseConnectionManager.disconnect();
    console.log(error);
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
