import { ExercisePrimitive } from './ExercisePrimitive';
import { PrimitiveObject } from '../../../Shared/domain/PrimitiveObject';

export interface UserExercisesPrimitive extends PrimitiveObject {
  _id: string;
  exercises: ExercisePrimitive[];
}
