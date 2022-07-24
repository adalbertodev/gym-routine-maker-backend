import { Exercise } from '../../domain/Exercise';
import { ResponseExercise } from '../interfaces';

type Config = {
  id: boolean;
};

export const exerciseToResponseExercise = (
  exercise: Exercise,
  config?: Config
): ResponseExercise => {
  const id = config?.id || false;

  return {
    id: exercise._id.value,
    userId: id ? exercise.userId?.value || null : undefined,
    name: exercise.name.value,
    muscle: exercise.muscle.value,
    barWeight: exercise.barWeight?.value || null,
    rm: exercise.rm?.value || null
  };
};
