import { PrimitiveObject } from '../../../Shared/domain/PrimitiveObject';

export interface ExercisePrimitive extends PrimitiveObject {
  _id: string;
  name: string;
  muscle: string;
  barWeight: number | null;
  rm: number | null;
}
