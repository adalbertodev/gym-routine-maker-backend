import { Request, Response } from 'express';
import { UserExercisesConnectionManager } from '../../infrastructure/persistence/UserExercisesConnectionManager';
import { getUsersExercises } from '../use-cases/getUsersExercises';
import { convertToResponseUserExercises } from '../utils/convertToResponseUserExercises';
import { UserExercisesResponse } from '../interfaces';

export const getUsersExercisesController = async(
  req: Request,
  res: Response<UserExercisesResponse>
) => {
  try {
    const repository = UserExercisesConnectionManager.connect();

    const usersExercises = await getUsersExercises(repository);

    const responseUsersExercises = usersExercises.map(usersExercises => convertToResponseUserExercises(usersExercises));

    await UserExercisesConnectionManager.disconnect();
    return res.status(200).json({ data: responseUsersExercises, error: null });
  } catch (error: any) {
    await UserExercisesConnectionManager.disconnect();
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
