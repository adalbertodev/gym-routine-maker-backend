import { Exercise } from '../../../../src/modules/Exercise/exercises/domain/Exercise';
import { UserIdMother } from '../../shared/domain/UserIdMother';
import { ExerciseBarWeightMother, ExerciseIdMother, ExerciseMother, ExerciseMuscleMother, ExerciseNameMother, ExerciseRmMother } from '../domain/Exercise';

export const randomExercise = ExerciseMother.random();

export const generateRandomExercise = () => {
  return new Exercise(
    ExerciseIdMother.random(),
    UserIdMother.random(),
    ExerciseNameMother.random(),
    ExerciseMuscleMother.random(),
    ExerciseBarWeightMother.random(),
    ExerciseRmMother.random()
  );
};

export const randomExerciseValues = generateRandomExercise().toPrimitives();

export const randomExerciseObjectValues = {
  _id: ExerciseIdMother.random(),
  userId: UserIdMother.random(),
  name: ExerciseNameMother.random(),
  muscle: ExerciseMuscleMother.random(),
  barWeight: ExerciseBarWeightMother.random(),
  rm: ExerciseRmMother.random()
};

export const randomExerciseValuesWithNulls = {
  _id: ExerciseIdMother.random(),
  userId: null,
  name: ExerciseNameMother.random(),
  muscle: ExerciseMuscleMother.random(),
  barWeight: null,
  rm: null
};

export const randomExerciseBody = {
  userId: UserIdMother.random().value,
  name: ExerciseNameMother.random().value,
  muscle: ExerciseMuscleMother.random().value,
  barWeight: ExerciseBarWeightMother.random().value,
  rm: ExerciseRmMother.random().value
};
