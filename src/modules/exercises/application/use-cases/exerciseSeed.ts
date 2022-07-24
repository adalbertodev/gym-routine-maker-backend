import { Exercise, ExerciseRepository } from '../../domain/Exercise';
import { exercisesSeedData } from '../utils';

export const exerciseSeed = async(
  repository: ExerciseRepository
): Promise<Exercise[]> => {
  const exercises = exercisesSeedData.map((exerciseSeedData) =>
    Exercise.fromPrimitives(exerciseSeedData)
  );

  await repository.reset();

  for (const exercise of exercises) {
    await repository.save(exercise);
  }

  return exercises;
};
