import { Exercise } from '../../../../../src/modules/UserExercises/domain/UserExercises';
import { randomExerciseObjectValues } from '../../__fixtures__/ExercisesFixtures';

describe('Exercise', () => {
  test('should return a new exercise instance', () => {
    const { _id, name, muscle, barWeight, rm } = randomExerciseObjectValues;
    const exercise = new Exercise(_id, name, muscle, barWeight, rm);

    expect(exercise._id.value).toBe(_id.value);
    expect(exercise.name.value).toBe(name.value);
    expect(exercise.muscle.value).toBe(muscle.value);
    expect(exercise.barWeight?.value).toBe(barWeight.value);
    expect(exercise.rm?.value).toBe(rm.value);
  });

  test('should return a new exercise instance with nulls', () => {
    const { _id, name, muscle } = randomExerciseObjectValues;
    const exercise = new Exercise(_id, name, muscle, null, null);

    expect(exercise._id.value).toBe(_id.value);
    expect(exercise.name.value).toBe(name.value);
    expect(exercise.muscle.value).toBe(muscle.value);
    expect(exercise.barWeight).toBeNull();
    expect(exercise.rm).toBeNull();
  });

  test('should return a new exercise instance from primitives', () => {
    const { _id, name, muscle, barWeight, rm } = randomExerciseObjectValues;
    const exercise = Exercise.fromPrimitives({
      _id: _id.value,
      name: name.value,
      muscle: muscle.value,
      barWeight: barWeight.value,
      rm: rm.value
    });

    expect(exercise._id.value).toBe(_id.value);
    expect(exercise.name.value).toBe(name.value);
    expect(exercise.muscle.value).toBe(muscle.value);
    expect(exercise.barWeight?.value).toBe(barWeight.value);
    expect(exercise.rm?.value).toBe(rm.value);
  });

  test('should return a exercise primitive', () => {
    const { _id, name, muscle, barWeight, rm } = randomExerciseObjectValues;
    const exercise = new Exercise(_id, name, muscle, barWeight, rm);

    const exercisePrimitive = exercise.toPrimitives();

    expect(exercisePrimitive._id).toBe(_id.value);
    expect(exercisePrimitive.name).toBe(name.value);
    expect(exercisePrimitive.muscle).toBe(muscle.value);
    expect(exercisePrimitive.barWeight).toBe(barWeight.value);
    expect(exercisePrimitive.rm).toBe(rm.value);
  });
});
