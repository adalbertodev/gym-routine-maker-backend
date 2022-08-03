import { Response } from 'express';

import { getUserExercises } from '../use-cases/getUserExercises';
import { populateUserExercises } from '../use-cases/populateUserExercises';
import { SaveUserExerciseRequest } from '../interfaces';
import { saveUserExercises } from '../use-cases/saveUserExercises';
import { UserExercises } from '../../domain/UserExercises/UserExercises';
import { UserExercisesConnectionManager } from '../../infrastructure/persistence/UserExercisesConnectionManager';
import { UserExercisesNotExist } from '../../domain/Errors/UserExercisesNotExist';
import { UserExercisesResponse } from '../interfaces/UserExercisesResponse';
import { userExercisesToResponseUserExercises } from '../utils/userExercisesToResponseUserExercises';
import { UserId } from '../../../../Shared/domain/UserId';

export const updateUserExercisesController = async(req: SaveUserExerciseRequest, res: Response<UserExercisesResponse>) => {
  const { userId } = req.params;
  const { exercises } = req.body;

  const id = new UserId(userId);

  try {
    const repository = UserExercisesConnectionManager.connect();

    const userExercises = await getUserExercises(id, repository);
    const userExercisesPrimitive = userExercises.toPrimitives();
    const updatedUserExercises = UserExercises.fromPrimitives({
      ...userExercisesPrimitive,
      dryExercises: userExercisesPrimitive.dryExercises.map(dryExercise => {
        const newExercise = exercises.find(exercise => exercise.exercise === dryExercise.exercise);
        return newExercise || dryExercise;
      })
    });
    const newUserExercises = await saveUserExercises(updatedUserExercises, repository);
    const populatedNewUserExercises = await populateUserExercises(newUserExercises, repository);
    const responseUserExercises = userExercisesToResponseUserExercises(populatedNewUserExercises);

    await UserExercisesConnectionManager.disconnect();
    return res.status(200).json({ data: responseUserExercises, error: null });
  } catch (error: any) {
    await UserExercisesConnectionManager.disconnect();

    if (error instanceof UserExercisesNotExist) {
      return res.status(400).json({ data: null, error: { message: error.message } });
    }

    console.log(error);
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
