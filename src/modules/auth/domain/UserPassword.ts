import { InvalidArgumentError } from '../../shared/domain/value-object/InvalidArgumentError';
import { StringValueObject } from '../../shared/domain/value-object/StringValueObject';

export class UserPassword extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan50Characters(value);
  }

  private ensureLengthIsLessThan50Characters = (value: string) => {
    if (value.length > 50) {
      throw new InvalidArgumentError(`The User Name <${value}> has more than 50 characters`);
    }
  };
}
