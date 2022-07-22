import { EnumValueObject } from '../../../shared/domain/value-object/EnumValueObject';
import { InvalidArgumentError } from '../../../shared/domain/value-object/InvalidArgumentError';

export class UserRole extends EnumValueObject<string> {
  constructor(value: string) {
    super(value, ['admin', 'user']);
  }

  protected throwErrorForInvalidValue(value: string): void {
    throw new InvalidArgumentError(`${value} is not a valid role`);
  }
}
