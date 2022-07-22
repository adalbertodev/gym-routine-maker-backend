import { PrimitiveObject } from './PrimitiveObject';

export abstract class AggregateRoot {
  abstract toPrimitives: () => PrimitiveObject;
}
