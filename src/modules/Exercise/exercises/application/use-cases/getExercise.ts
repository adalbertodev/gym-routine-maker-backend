import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError';
import { Exercise, ExerciseId, ExerciseRepository } from '../../domain/Exercise';

export const getExercise = async(
  id: ExerciseId,
  repository: ExerciseRepository
): Promise<Exercise> => {
  const exercisePrimitive = await repository.search(id);

  if (!exercisePrimitive) {
    console.log('No existe un ejercicio con ese id');
    throw new InvalidArgumentError(`No exercise found with this id <${id.value}>`);
  };

  return Exercise.fromPrimitives(exercisePrimitive);
};
