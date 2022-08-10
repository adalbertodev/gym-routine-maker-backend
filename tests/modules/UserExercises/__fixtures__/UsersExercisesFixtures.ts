import { UserIdMother } from '../../Shared/domain/UserIdMother';
import { UserExercisesMother } from '../domain/UserExercises/UserExercisesMother';
import { randomExercise } from './ExercisesFixtures';

export const randomUserExercises = () => UserExercisesMother.random();

export const randomUserExercisesValues = () => randomUserExercises().toPrimitives();

export const randomUserExercisesObjectValues = {
  _id: UserIdMother.random(),
  exercises: [
    randomExercise(),
    randomExercise()
  ]
};

export const usersExercisesData = [
  randomUserExercisesValues(),
  randomUserExercisesValues(),
  randomUserExercisesValues(),
  randomUserExercisesValues(),
  randomUserExercisesValues(),
  randomUserExercisesValues(),
  randomUserExercisesValues(),
  randomUserExercisesValues()
];
