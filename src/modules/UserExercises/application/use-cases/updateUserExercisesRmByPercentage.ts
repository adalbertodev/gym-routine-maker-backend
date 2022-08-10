import { calculateExerciseRmPercentually } from '../utils/calculateExerciseRmPercentually';
import { UserExercisesNotExist } from '../../domain/Errors/UserExercisesNotExist';
import { UserExercisesPrimitive } from '../../domain/interfaces';
import { UserExercisesRepository, UserExercises } from '../../domain/UserExercises';
import { UserId } from '../../../Shared/domain/UserId';

export const updateUserExercisesRmByPercentage = async(
  userId: UserId,
  percentage: number,
  repository: UserExercisesRepository
): Promise<UserExercises> => {
  const userExercisesPrimitive = await repository.search(userId);
  if (!userExercisesPrimitive) throw new UserExercisesNotExist(userId.value);

  const updatedUserExercisesPrimitive: UserExercisesPrimitive = {
    ...userExercisesPrimitive,
    exercises: userExercisesPrimitive.exercises.map(exercise => calculateExerciseRmPercentually(exercise, percentage))
  };

  const updatedUserExercises = UserExercises.fromPrimitives(updatedUserExercisesPrimitive);

  await repository.save(updatedUserExercises);
  return updatedUserExercises;
};
