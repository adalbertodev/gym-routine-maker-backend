import { Exercise, UserExercises, UserExercisesRepository } from '../../domain/UserExercises';
import { ExerciseAlreadyExists, ExerciseNotExist, UserExercisesNotExist } from '../../domain/Errors';
import { UserId } from '../../../Shared/domain/UserId';

export const updateExercise = async(
  userId: UserId,
  updatedExercise: Exercise,
  repository: UserExercisesRepository
): Promise<UserExercises> => {
  const userExercises = await repository.search(userId);
  if (!userExercises) throw new UserExercisesNotExist(userId.value);

  const { _id, exercises } = userExercises;

  const exerciseToUpdate = exercises.find(exercise => exercise._id === updatedExercise._id.value);
  if (!exerciseToUpdate) throw new ExerciseNotExist(userId.value);

  const exerciseByName = exercises.find(exercise => exercise.name === updatedExercise.name.value);

  if (exerciseByName && exerciseByName._id !== updatedExercise._id.value) {
    throw new ExerciseAlreadyExists(updatedExercise.name.value);
  }

  const newUserExercises = UserExercises.fromPrimitives({
    _id,
    exercises: exercises.map(exercise =>
      exercise._id === updatedExercise._id.value ? updatedExercise.toPrimitives() : exercise
    )
  });

  await repository.save(newUserExercises);
  return newUserExercises;
};
