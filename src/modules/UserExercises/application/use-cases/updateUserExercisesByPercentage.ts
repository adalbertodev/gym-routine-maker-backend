import { UserId } from '../../../Shared/domain/UserId';
import { UserExercisesNotExist } from '../../domain/Errors/UserExercisesNotExist';
import { UserExercisesPrimitive } from '../../domain/interfaces';
import { UserExercisesRepository, UserExercises } from '../../domain/UserExercises';

export const updateUserExercisesByPercentage = async(
  userId: UserId,
  repository: UserExercisesRepository,
  percentage: number
): Promise<UserExercises> => {
  const userExercisesPrimitive = await repository.search(userId);
  if (!userExercisesPrimitive) throw new UserExercisesNotExist(userId.value);

  const updatedUserExercisesPrimitive: UserExercisesPrimitive = {
    ...userExercisesPrimitive,
    exercises: userExercisesPrimitive.exercises.map(exercise => {
      const barWeight = exercise.barWeight || 0;
      const percentageAdded = 1 + percentage;

      return {
        ...exercise,
        rm: exercise.rm ? ((exercise.rm + barWeight) * percentageAdded) - barWeight : null
      };
    })
  };

  const updatedUserExercises = UserExercises.fromPrimitives(updatedUserExercisesPrimitive);

  await repository.save(updatedUserExercises);
  return updatedUserExercises;
};
