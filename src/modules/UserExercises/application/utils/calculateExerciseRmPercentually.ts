import { ExercisePrimitive } from '../../domain/interfaces';
import { roundNumber } from '../../../Shared/application/utils/roundNumber';

export const calculateExerciseRmPercentually = (exercise: ExercisePrimitive, percentage: number): ExercisePrimitive => {
  const barWeight = exercise.barWeight || 0;
  const newRm = exercise.rm ? calculateRmPercentually(exercise.rm, barWeight, percentage) : null;

  return {
    ...exercise,
    rm: newRm ? roundNumber(newRm) : null
  };
};

export const calculateRmPercentually = (rm: number, barWeight: number, percentage: number) => {
  const percentageAdded = 1 + percentage;
  return (rm + barWeight) * percentageAdded - barWeight;
};
