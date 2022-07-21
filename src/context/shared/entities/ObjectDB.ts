import { PrimitiveObject } from './PrimitiveObject';

export abstract class ObjectDB {
  abstract toPrimitives: () => PrimitiveObject;
}
