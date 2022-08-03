import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError';
import { StringValueObject } from '../../../../Shared/domain/value-object/StringValueObject';

export class ExerciseName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan30Characters(value);
  }

  private ensureLengthIsLessThan30Characters = (value: string) => {
    if (value.length > 30) {
      throw new InvalidArgumentError(`The Exercise Name <${value}> has more than 30 characters`);
    }
  };
}
