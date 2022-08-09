import { UserIdMother } from '../../Shared/domain/UserIdMother';
import { UserExercises } from '../../../../src/modules/UserExercises/domain/UserExercises/UserExercises';
import { generateRandomExercise } from './ExercisesFixtures';
import { UserExercisesMother } from '../domain/UserExercises/UserExercisesMother';

export const randomUserExercises = UserExercisesMother.random();

export const generateRandomUserExercises = () => {
  return new UserExercises(
    UserIdMother.random(),
    [
      generateRandomExercise(),
      generateRandomExercise()
    ]
  );
};

export const generateRandomUserExercisesValues = generateRandomUserExercises().toPrimitives();

export const randomUserExercisesObjectValues = {
  _id: UserIdMother.random(),
  exercises: [
    generateRandomExercise(),
    generateRandomExercise()
  ]
};
