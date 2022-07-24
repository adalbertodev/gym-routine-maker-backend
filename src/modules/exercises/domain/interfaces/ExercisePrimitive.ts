import { PrimitiveObject } from '../../../shared/domain/PrimitiveObject';

export interface ExercisePrimitive extends PrimitiveObject {
  _id: string;
  userId: string | null;
  name: string;
  muscle: string;
  barWeight: number | null;
  rm: number | null;
}
