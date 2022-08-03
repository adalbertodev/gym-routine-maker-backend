import { Exercise, ExerciseRepository } from '../../domain/Exercise';

export const getExercises = async(
  repository: ExerciseRepository
): Promise<Exercise[]> => {
  const exercisesPrimitive = await repository.searchAll();
  return exercisesPrimitive.map((exercisePrimitive) =>
    Exercise.fromPrimitives(exercisePrimitive)
  );
};
