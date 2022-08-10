import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';
import { roundNumber } from '../../../Shared/application/utils/roundNumber';

export class ExerciseBarWeight extends NumberValueObject {
  constructor(value: number) {
    value = roundNumber(value);
    super(value);
    this.ensureIsValidInt(value);
  }

  private ensureIsValidInt = (value: number) => {
    if (value > Number.MAX_VALUE) {
      throw new InvalidArgumentError(`The Exercise Bar Weight <${value}> cannot be greater than ${Number.MAX_VALUE}`);
    }
  };
}
