import { UserExercises } from '../../domain/UserExercises';
import { ResponseUserExercises } from '../interfaces';

export const convertToResponseUserExercises = (
  userExercises: UserExercises
): ResponseUserExercises => {
  const userExercisesPrimitives = userExercises.toPrimitives();
  return {
    ...userExercisesPrimitives,
    exercises: userExercisesPrimitives.exercises.map(exercise => ({
      _id: exercise._id,
      name: exercise.name,
      muscle: exercise.muscle,
      barWeight: exercise.barWeight || null,
      rm: exercise.rm || null
    }))
  };
};
