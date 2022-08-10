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
    exercises: userExercisesPrimitive.exercises.map(exercise => {
      const barWeight = exercise.barWeight || 0;
      const percentageAdded = 1 + percentage;
      const newRm = exercise.rm ? (exercise.rm + barWeight) * percentageAdded - barWeight : null;

      return {
        ...exercise,
        rm: newRm ? Math.floor(newRm * 100) / 100 : null
      };
    })
  };

  const updatedUserExercises = UserExercises.fromPrimitives(updatedUserExercisesPrimitive);

  await repository.save(updatedUserExercises);
  return updatedUserExercises;
};
