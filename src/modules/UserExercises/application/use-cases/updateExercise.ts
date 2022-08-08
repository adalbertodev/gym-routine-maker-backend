import { Exercise, UserExercises, UserExercisesRepository } from '../../domain/UserExercises';
import { ExerciseAlreadyExists, UserExercisesNotExist } from '../../domain/Errors';
import { UserId } from '../../../Shared/domain/UserId';

export const updateExercise = async(
  userId: UserId,
  updatedExercise: Exercise,
  repository: UserExercisesRepository
): Promise<UserExercises> => {
  const userExercises = await repository.search(userId);
  if (!userExercises) throw new UserExercisesNotExist(userId.value);

  const { _id, exercises } = userExercises;

  const exerciseByName = exercises.find(exercise => exercise.name === updatedExercise.name.value);

  if (exerciseByName && exerciseByName._id !== updatedExercise._id.value) {
    throw new ExerciseAlreadyExists(updatedExercise.name.value);
  }

  const newUserExercises = UserExercises.fromPrimitives({ _id, exercises: [...exercises, updatedExercise.toPrimitives()] });

  await repository.save(newUserExercises);
  return newUserExercises;
};
