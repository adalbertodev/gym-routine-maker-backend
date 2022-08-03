import dotenv from 'dotenv';

import { UserExercisesConnectionManager } from '../../UserExercisesConnectionManager';
import { usersExercisesSeedData } from './usersExercisesSeedData';
import { UserExercises } from '../../../../domain/UserExercises/UserExercises';

export const usersExercisesSeed = async(): Promise<void> => {
  dotenv.config({ path: '.env.dev' });
  const repository = UserExercisesConnectionManager.connect();

  const userExercises = usersExercisesSeedData.map((userExerciseSeedData) =>
    UserExercises.fromPrimitives(userExerciseSeedData)
  );

  await repository.reset();

  for (const userExercise of userExercises) {
    await repository.save(userExercise);
  }

  UserExercisesConnectionManager.disconnect();
};

usersExercisesSeed();
