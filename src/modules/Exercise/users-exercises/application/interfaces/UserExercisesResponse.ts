import { ErrorResponse } from '../../../../Shared/application/interfaces/ErrorResponse';

export interface ResponseUserExercises {
  _id: string;
  exercises: {
    exercise: { _id: string; name: string; muscle: string; barWeight: number | null };
    rm: number | null;
  }[];
}

export interface UserExercisesResponse {
  data: ResponseUserExercises | ResponseUserExercises[] | null;
  error: ErrorResponse | null;
}
