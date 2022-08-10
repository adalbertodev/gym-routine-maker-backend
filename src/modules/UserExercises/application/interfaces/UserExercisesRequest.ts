import { ExercisePrimitive } from '../../domain/interfaces';

export interface SaveUserExercisesRequestBody {
  exercises: ExercisePrimitive[]
}

export interface UpdateUserExerciseRequestBody {
  percentage: number
}
