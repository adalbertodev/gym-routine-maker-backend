import { ExerciseNotExist } from '../../domain/Errors';
import { Exercise, ExerciseId, ExerciseRepository } from '../../domain/Exercise';

export const deleteExercise = async(
  id: ExerciseId,
  repository: ExerciseRepository
): Promise<Exercise> => {
  const deletedExercise = await repository.delete(id);

  if (!deletedExercise) {
    console.log('No existe un ejercicio con ese id');
    throw new ExerciseNotExist(`No exercise found with this id <${id.value}>`);
  };

  return Exercise.fromPrimitives(deletedExercise);
};
