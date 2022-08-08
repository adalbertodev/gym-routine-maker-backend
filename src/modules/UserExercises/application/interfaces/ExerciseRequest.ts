import { Request } from 'express';

export interface newExerciseBody {
  name: string;
  muscle: string;
  barWeight: number | null;
  rm: number | null;
}

export interface SaveExerciseRequest extends Request {
  body: newExerciseBody
}
