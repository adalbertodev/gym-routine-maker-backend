import { Request, Response } from 'express';
import { UserExercisesConnectionManager } from '../../infrastructure/persistence/UserExercisesConnectionManager';
import { UserExercisesResponse } from '../interfaces';
import { getUsersExercises } from '../use-cases/getUsersExercises';
import { populateUserExercises } from '../use-cases/populateUserExercises';
import { userExercisesToResponseUserExercises } from '../utils/userExercisesToResponseUserExercises';

export const getUsersExercisesController = async(
  req: Request,
  res: Response<UserExercisesResponse>
) => {
  try {
    const repository = UserExercisesConnectionManager.connect();

    const usersExercises = await getUsersExercises(repository);

    const populatedUsersExercises = await Promise.all(
      usersExercises.map(async(userExercises) => {
        return await populateUserExercises(userExercises, repository);
      })
    );
    const responseUsersExercises = populatedUsersExercises.map(populatedUserExercises => userExercisesToResponseUserExercises(populatedUserExercises));

    await UserExercisesConnectionManager.disconnect();
    return res.status(200).json({ data: responseUsersExercises, error: null });
  } catch (error: any) {
    await UserExercisesConnectionManager.disconnect();
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
