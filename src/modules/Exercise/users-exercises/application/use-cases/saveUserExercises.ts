import { UserExercises, UserExercisesRepository } from '../../domain/UserExercises';

export const saveUserExercises = async(
  userExercise: UserExercises,
  repository: UserExercisesRepository
): Promise<UserExercises> => {
  await repository.save(userExercise);

  return userExercise;
};
