import { PopulatedUserExercises } from '../../domain/UserExercises';
import { ResponseUserExercises } from '../interfaces';

export const userExercisesToResponseUserExercises = (
  userExercises: PopulatedUserExercises
): ResponseUserExercises => {
  const userExercisesPrimitives = userExercises.toPrimitives();
  return {
    ...userExercisesPrimitives,
    exercises: userExercisesPrimitives.exercises.map(exercise => ({ ...exercise, userId: undefined }))
  };
};
