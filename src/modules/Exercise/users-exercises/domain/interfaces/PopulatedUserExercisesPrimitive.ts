import { PrimitiveObject } from '../../../../Shared/domain/PrimitiveObject';
import { ExercisePrimitive } from '../../../exercises/domain/interfaces';

export interface ExerciseWithRmPrimitive {
  exercise: ExercisePrimitive;
  rm: number | null;
}

export interface PopulatedUserExercisesPrimitive extends PrimitiveObject {
  _id: string,
  exercises: ExerciseWithRmPrimitive[]
}
