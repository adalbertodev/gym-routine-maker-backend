import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class UserPassword extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan60Characters(value);
  }

  private ensureLengthIsLessThan60Characters = (value: string) => {
    if (value.length > 60) {
      throw new InvalidArgumentError(`The User Password <${value}> has more than 60 characters`);
    }
  };
}
