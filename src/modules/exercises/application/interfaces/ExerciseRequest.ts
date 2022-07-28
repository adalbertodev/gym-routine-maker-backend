import { Request } from 'express';

export interface newExerciseBody {
  userId: string | null;
  name: string;
  muscle: string;
  barWeight: number | null;
  rm: number | null;
}

export interface saveExerciseRequest extends Request {
  body: newExerciseBody
}
