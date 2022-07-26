import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class UserEmail extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidEmail(value);
  }

  private ensureIsValidEmail = (value: string) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

    if (!value.match(emailRegex)) {
      throw new InvalidArgumentError('The given email is not a valid email');
    }
  };
}
