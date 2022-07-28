import { Exercise, ExerciseName, ExerciseRepository } from '../../domain/Exercise';
import { ExerciseAlreadyExists } from '../../domain/Errors';
import { newExerciseBody } from '../interfaces/ExerciseRequest';
import { Uuid } from '../../../shared/domain/value-object/Uuid';

export const createExercise = async(
  exercise: newExerciseBody,
  repository: ExerciseRepository
): Promise<Exercise> => {
  if (await repository.searchByName(new ExerciseName(exercise.name))) {
    console.log('El ejercicio ya existe');
    throw new ExerciseAlreadyExists(exercise.name);
  }

  const newExercise = Exercise.fromPrimitives({
    _id: Uuid.random().value,
    ...exercise
  });

  await repository.save(newExercise);

  return newExercise;
};
