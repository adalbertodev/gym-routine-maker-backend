import { UserId } from '../../../shared/domain/UserId';
import { Exercise, ExerciseRepository } from '../../domain/Exercise';

export const getExercisesByUser = async(
  userId: UserId,
  repository: ExerciseRepository
): Promise<Exercise[]> => {
  const exercisesPrimitive = await repository.searchByUser(userId);
  return exercisesPrimitive.map((exercisePrimitive) =>
    Exercise.fromPrimitives(exercisePrimitive)
  );
};
