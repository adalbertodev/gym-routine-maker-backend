import { Exercise } from '../../../../src/modules/UserExercises/domain/UserExercises';
import { UserIdMother } from '../../Shared/domain/UserIdMother';
import { ExerciseBarWeightMother, ExerciseIdMother, ExerciseMother, ExerciseMuscleMother, ExerciseNameMother, ExerciseRmMother } from '../domain/UserExercises';
import { newExerciseBody } from '../../../../src/modules/UserExercises/application/interfaces/ExerciseRequest';

export const randomExercise = ExerciseMother.random();

export const generateRandomExercise = () => {
  return new Exercise(
    ExerciseIdMother.random(),
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

export const randomExerciseBody: newExerciseBody = {
  name: ExerciseNameMother.random().value,
  muscle: ExerciseMuscleMother.random().value,
  barWeight: ExerciseBarWeightMother.random().value,
  rm: ExerciseRmMother.random().value
};
