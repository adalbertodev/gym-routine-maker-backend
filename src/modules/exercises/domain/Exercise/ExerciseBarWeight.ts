import { NumberValueObject } from '../../../shared/domain/value-object/IntValueObject';
import { InvalidArgumentError } from '../../../shared/domain/value-object/InvalidArgumentError';

export class ExerciseBarWeight extends NumberValueObject {
  constructor(value: number) {
    value = Math.round(value * 100) / 100;
    super(value);
    this.ensureIsValidInt(value);
  }

  private ensureIsValidInt = (value: number) => {
    if (value > Number.MAX_VALUE) {
      throw new InvalidArgumentError(`The Exercise Bar Weight <${value}> cannot be greater than ${Number.MAX_VALUE}`);
    }
  };
}
