import { UserId } from '../../../Shared/domain/UserId';
import { ExerciseNotExist, UserExercisesNotExist } from '../../domain/Errors';
import { ExerciseId, UserExercises, UserExercisesRepository } from '../../domain/UserExercises';

export const deleteExercise = async(
  userId: UserId,
  exerciseId: ExerciseId,
  repository: UserExercisesRepository
): Promise<UserExercises> => {
  const userExercises = await repository.search(userId);
  if (!userExercises) throw new UserExercisesNotExist(userId.value);

  const { _id, exercises } = userExercises;

  if (!exercises.find(exercise => exercise._id === exerciseId.value)) {
    throw new ExerciseNotExist(exerciseId.value);
  }

  const newUserExercises = UserExercises.fromPrimitives({
    _id,
    exercises: exercises.filter(exercise => exercise._id !== exerciseId.value)
  });

  await repository.save(newUserExercises);
  return newUserExercises;
};
