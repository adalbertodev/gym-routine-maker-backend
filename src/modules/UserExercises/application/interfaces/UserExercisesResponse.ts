import { ErrorResponse } from '../../../Shared/application/interfaces/ErrorResponse';

export interface ResponseUserExercises {
  id: string;
  exercises: {
    id: string;
    name: string;
    muscle: string;
    barWeight: number | null;
    rm: number | null;
  }[];
}

export interface UserExercisesResponse {
  data: ResponseUserExercises | ResponseUserExercises[] | null;
  error: ErrorResponse | null;
}
