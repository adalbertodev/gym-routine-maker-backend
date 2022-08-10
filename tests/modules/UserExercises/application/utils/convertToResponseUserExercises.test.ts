import { convertToResponseUserExercises } from '../../../../../src/modules/UserExercises/application/utils';
import { randomUserExercises } from '../../__fixtures__/UsersExercisesFixtures';

describe('exerciseToResponseExercise', () => {
  test('should return a response exercise with the input values', () => {
    const userExercises = randomUserExercises();
    const responseExercise = convertToResponseUserExercises(userExercises);

    expect(responseExercise.id).toBe(userExercises._id.value);

    for (const exercise of responseExercise.exercises) {
      const expectedUserExercises = userExercises.exercises.find(exercises => exercises._id.value === exercise.id);
      expect(exercise.id).toBe(expectedUserExercises?._id.value);
      expect(exercise.name).toBe(expectedUserExercises?.name.value);
      expect(exercise.muscle).toBe(expectedUserExercises?.muscle.value);
      expect(exercise.barWeight).toBe(expectedUserExercises?.barWeight?.value || null);
      expect(exercise.rm).toBe(expectedUserExercises?.rm?.value || null);
    }
  });
});
