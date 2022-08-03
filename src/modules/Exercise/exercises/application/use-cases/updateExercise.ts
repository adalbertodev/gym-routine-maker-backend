import { Exercise, ExerciseRepository } from '../../domain/Exercise';
import { ExerciseAlreadyExists, ExerciseNotExist } from '../../domain/Errors';

export const updateExercise = async(
  exercise: Exercise,
  repository: ExerciseRepository
): Promise<Exercise> => {
  if (!await repository.search(exercise._id)) {
    console.log('El ejercicio no existe');
    throw new ExerciseNotExist(exercise._id.value);
  }

  const exerciseSearchedByName = await repository.searchByName(exercise.name);

  if (exerciseSearchedByName && exerciseSearchedByName._id !== exercise._id.value) {
    console.log('El ejercicio ya existe');
    throw new ExerciseAlreadyExists(exercise.name.value);
  }

  await repository.save(exercise);

  return exercise;
};
