import { ResponseUserExercises } from '../interfaces';
import { UserExercises } from '../../domain/UserExercises';

export const convertToResponseUserExercises = (userExercises: UserExercises): ResponseUserExercises => {
  const userExercisesPrimitives = userExercises.toPrimitives();
  return {
    id: userExercisesPrimitives._id,
    exercises: userExercisesPrimitives.exercises.map(exercise => ({
      id: exercise._id,
      name: exercise.name,
      muscle: exercise.muscle,
      barWeight: exercise.barWeight || null,
      rm: exercise.rm || null
    }))
  };
};
