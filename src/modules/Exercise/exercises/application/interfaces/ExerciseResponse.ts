import { ErrorResponse } from '../../../../Shared/application/interfaces/ErrorResponse';

export interface ResponseExercise {
  id: string;
  userId?: string | null;
  name: string;
  muscle: string;
  barWeight: number | null;
}
export interface ExerciseResponse {
  data: ResponseExercise | ResponseExercise[] | null;
  error: ErrorResponse | null;
}
