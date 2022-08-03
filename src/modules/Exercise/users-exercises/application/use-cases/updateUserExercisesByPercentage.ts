import { UserId } from '../../../../Shared/domain/UserId';
import { UserExercisesNotExist } from '../../domain/Errors/UserExercisesNotExist';
import { PopulatedUserExercisesPrimitive } from '../../domain/interfaces/PopulatedUserExercisesPrimitive';
import { UserExercises, UserExercisesRepository } from '../../domain/UserExercises';

export const updateUserExercisesByPercentage = async(
  userId: UserId,
  repository: UserExercisesRepository,
  percentage: number
): Promise<UserExercises> => {
  const userExercisesPrimitive = await repository.search(userId);

  if (!userExercisesPrimitive) {
    throw new UserExercisesNotExist(userId.value);
  }

  const populatedUserExercisesPrimitive = await repository.populate(UserExercises.fromPrimitives(userExercisesPrimitive));

  const updatedUserExercisesPrimitive: PopulatedUserExercisesPrimitive = {
    ...populatedUserExercisesPrimitive,
    exercises: populatedUserExercisesPrimitive.exercises.map(exercise => {
      const barWeight = exercise.exercise.barWeight || 0;
      const percentageAdded = 1 + percentage;

      return {
        ...exercise,
        rm: exercise.rm ? ((exercise.rm + barWeight) * percentageAdded) - barWeight : null
      };
    })
  };

  const updatedUserExercises = UserExercises.fromPrimitives({
    _id: updatedUserExercisesPrimitive._id,
    dryExercises: updatedUserExercisesPrimitive.exercises.map(exercise => ({ exercise: exercise.exercise._id, rm: exercise.rm }))
  });

  await repository.save(updatedUserExercises);

  return updatedUserExercises;
};
