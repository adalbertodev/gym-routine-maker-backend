import { randomExerciseValues } from '../../__fixtures__/ExercisesFixtures';
import { calculateExerciseRmPercentually, calculateRmPercentually } from '../../../../../src/modules/UserExercises/application/utils/calculateExerciseRmPercentually';

describe('calculateExerciseRmPercentually', () => {
  describe('#calculateExerciseRmPercentually', () => {
    test('should return a calculated exercise correctly', () => {
      const exercisePrimitive = { ...randomExerciseValues(), rm: 120, barWeight: 7.5 };
      const percentage = 0.1;
      const expectedExercise = { ...exercisePrimitive, rm: 132.75 };

      const calculatedExercise = calculateExerciseRmPercentually(exercisePrimitive, percentage);

      expect(calculatedExercise._id).toBe(expectedExercise._id);
      expect(calculatedExercise.name).toBe(expectedExercise.name);
      expect(calculatedExercise.muscle).toBe(expectedExercise.muscle);
      expect(calculatedExercise.barWeight).toBe(expectedExercise.barWeight);
      expect(calculatedExercise.rm).toBe(expectedExercise.rm);
    });
  });

  describe('#calculateRmPercentually', () => {
    test('should return a calculated rm correctly', () => {
      const rm = 100;
      const barWeitght = 20;
      const percentage = 0.1;
      const expectedCalculatedRm = 112;

      const calculatedRm = calculateRmPercentually(rm, barWeitght, percentage);

      expect(calculatedRm).toBe(expectedCalculatedRm);
    });
  });
});
