import { PrimitiveObject } from '../../../../Shared/domain/PrimitiveObject';

export interface DryExerciseWithRmPrimitive {
  exercise: string;
  rm: number | null;
}

export interface UserExercisesPrimitive extends PrimitiveObject {
  _id: string;
  dryExercises: DryExerciseWithRmPrimitive[];
}
