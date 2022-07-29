import { exerciseToResponseExercise } from '../../../../../src/modules/exercises/application/utils';
import { randomExercise } from '../../__fixtures__/ExercisesFixtures';

describe('exerciseToResponseExercise', () => {
  test('should return a response exercise with the input values', () => {
    const responseExercise = exerciseToResponseExercise(randomExercise);

    expect(responseExercise.id).toBe(randomExercise._id.value);
    expect(responseExercise.userId).toBeFalsy();
    expect(responseExercise.name).toBe(randomExercise.name.value);
    expect(responseExercise.muscle).toBe(randomExercise.muscle.value);
    expect(responseExercise.barWeight).toBe(randomExercise.barWeight?.value || null);
    expect(responseExercise.rm).toBe(randomExercise.rm?.value || null);
  });

  test('should return a response exercise with userId', () => {
    const responseExercise = exerciseToResponseExercise(randomExercise, { id: true });

    expect(responseExercise.id).toBe(randomExercise._id.value);
    expect(responseExercise.userId).toBe(randomExercise.userId?.value || null);
    expect(responseExercise.name).toBe(randomExercise.name.value);
    expect(responseExercise.muscle).toBe(randomExercise.muscle.value);
    expect(responseExercise.barWeight).toBe(randomExercise.barWeight?.value || null);
    expect(responseExercise.rm).toBe(randomExercise.rm?.value || null);
  });
});
