import { ExerciseBarWeightMother, ExerciseIdMother, ExerciseMother, ExerciseMuscleMother, ExerciseNameMother, ExerciseRmMother } from '../domain/UserExercises';
import { SaveExerciseRequestBody } from '../../../../src/modules/UserExercises/application/interfaces/ExerciseRequest';

export const randomExercise = () => ExerciseMother.random();

export const randomExerciseValues = () => ExerciseMother.random().toPrimitives();

export const randomExerciseObjectValues = {
  _id: ExerciseIdMother.random(),
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

export const randomExerciseBody: SaveExerciseRequestBody = {
  name: ExerciseNameMother.random().value,
  muscle: ExerciseMuscleMother.random().value,
  barWeight: ExerciseBarWeightMother.random().value,
  rm: ExerciseRmMother.random().value
};
