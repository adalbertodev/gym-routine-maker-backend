import { Request } from 'express';
import { DryExerciseWithRmPrimitive } from '../../domain/interfaces/UserExercisesPrimitive';

export interface SaveUserExerciseRequest extends Request {
  body: { exercises: DryExerciseWithRmPrimitive[] };
}

export interface UpdateUserExerciseByPercentageRequest extends Request {
  body: { percentage: number };
}
