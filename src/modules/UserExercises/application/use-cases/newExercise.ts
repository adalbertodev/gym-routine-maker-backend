import { ExerciseAlreadyExists, UserExercisesNotExist } from '../../domain/Errors';
import { ExercisePrimitive } from '../../domain/interfaces';
import { SaveExerciseRequestBody } from '../interfaces/ExerciseRequest';
import { UserExercises, UserExercisesRepository } from '../../domain/UserExercises';
import { UserId } from '../../../Shared/domain/UserId';
import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export const newExercise = async(
  userId: UserId,
  exerciseBody: SaveExerciseRequestBody,
  repository: UserExercisesRepository
): Promise<UserExercises> => {
  const userExercises = await repository.search(userId);
  if (!userExercises) throw new UserExercisesNotExist(userId.value);

  const { _id, exercises } = userExercises;

  if (exercises.find(exercise => exercise.name === exerciseBody.name)) {
    throw new ExerciseAlreadyExists(exerciseBody.name);
  }

  const newExercise: ExercisePrimitive = {
    _id: Uuid.random().value,
    ...exerciseBody
  };

  const newUserExercises = UserExercises.fromPrimitives({
    _id,
    exercises: [...exercises, newExercise]
  });

  await repository.save(newUserExercises);
  return newUserExercises;
};
