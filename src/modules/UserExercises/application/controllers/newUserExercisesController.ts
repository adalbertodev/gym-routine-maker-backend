import { Response } from 'express';

import { convertToResponseUserExercises } from '../utils';
import { createUserExercises } from '../use-cases/createUserExercises';
import { UserExercisesAlreadyExists } from '../../domain/Errors';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { TypedRequest } from '../../../Shared/application/interfaces/TypedRequest';
import { UserExercisesConnectionManager } from '../../infrastructure/persistence/UserExercisesConnectionManager';
import { UserExercisesResponse } from '../interfaces';
import { UserId } from '../../../Shared/domain/UserId';

export const newUserExercisesController = async(req: TypedRequest<any>, res: Response<UserExercisesResponse>) => {
  const { userId } = req.params;

  try {
    const repository = UserExercisesConnectionManager.connect();

    const newUserExercises = await createUserExercises(new UserId(userId), repository);
    const responseUserExercises = convertToResponseUserExercises(newUserExercises);

    await UserExercisesConnectionManager.disconnect();
    return res.status(200).json({ data: responseUserExercises, error: null });
  } catch (error: any) {
    await UserExercisesConnectionManager.disconnect();

    if (error instanceof UserExercisesAlreadyExists || error instanceof InvalidArgumentError) {
      return res.status(400).json({ data: null, error: { message: error.message } });
    }

    console.log(error);
    return res.status(500).json({ data: null, error: { message: error } });
  }
};
