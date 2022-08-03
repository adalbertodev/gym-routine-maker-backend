import { UserExercises, UserExercisesRepository } from '../../domain/UserExercises';

export const getUsersExercises = async(
  repository: UserExercisesRepository
): Promise<UserExercises[]> => {
  const usersExercisesPrimitive = await repository.searchAll();
  return usersExercisesPrimitive.map((userExercisesPrimitive) =>
    UserExercises.fromPrimitives(userExercisesPrimitive)
  );
};
