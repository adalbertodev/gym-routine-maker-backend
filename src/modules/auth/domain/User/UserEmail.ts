import { InvalidArgumentError } from '../../../shared/domain/value-object/InvalidArgumentError';
import { StringValueObject } from '../../../shared/domain/value-object/StringValueObject';

export class UserEmail extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidEmail(value);
  }

  private ensureIsValidEmail = (value: string) => {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (!value.match(emailRegex)) {
      throw new InvalidArgumentError('The User Email is not a valid email');
    }
  };
}
