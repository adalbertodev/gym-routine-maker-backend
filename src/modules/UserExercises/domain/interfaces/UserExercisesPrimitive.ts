import { PrimitiveObject } from '../../../Shared/domain/PrimitiveObject';
import { ExercisePrimitive } from './ExercisePrimitive';

export interface UserExercisesPrimitive extends PrimitiveObject {
  _id: string;
  exercises: ExercisePrimitive[];
}
