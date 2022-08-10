import { randomUserExercisesObjectValues } from '../../__fixtures__/UsersExercisesFixtures';
import { UserExercises } from '../../../../../src/modules/UserExercises/domain/UserExercises';

describe('UserExercises', () => {
  test('should return a new user exercises instance', () => {
    const { _id, exercises } = randomUserExercisesObjectValues;
    const userExercises = new UserExercises(_id, exercises);

    expect(userExercises._id.value).toBe(_id.value);

    for (const exercise of userExercises.exercises) {
      const expectedExercise = exercises.find(exercises => exercises._id === exercise._id);
      expect(exercise).toEqual(expectedExercise);
    }
  });

  test('should return a new exercise instance from primitives', () => {
    const { _id, exercises } = randomUserExercisesObjectValues;
    const userExercises = UserExercises.fromPrimitives({
      _id: _id.value,
      exercises: exercises.map(exercise => exercise.toPrimitives())
    });

    expect(userExercises._id.value).toBe(_id.value);

    for (const exercise of userExercises.exercises) {
      const expectedExercise = exercises.find(exercises => exercises._id.value === exercise._id.value);
      expect(exercise.toPrimitives()).toEqual(expectedExercise?.toPrimitives());
    }
  });

  test('should return a exercise primitive', () => {
    const { _id, exercises } = randomUserExercisesObjectValues;
    const userExercises = new UserExercises(_id, exercises);

    const exercisePrimitive = userExercises.toPrimitives();

    expect(exercisePrimitive._id).toBe(_id.value);

    for (const exercise of exercisePrimitive.exercises) {
      const expectedExercise = exercises.find(exercises => exercises._id.value === exercise._id);
      expect(exercise).toEqual(expectedExercise?.toPrimitives());
    }
  });
});
