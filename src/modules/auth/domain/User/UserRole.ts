import { EnumValueObject } from '../../../shared/domain/value-object/EnumValueObject';
import { InvalidArgumentError } from '../../../shared/domain/value-object/InvalidArgumentError';
import { UserRoles } from '../interfaces';

export class UserRole extends EnumValueObject<`${UserRoles}`> {
  constructor(value: string) {
    const validValues = Object.values(UserRoles);
    super(value as UserRoles, validValues);
  }

  protected throwErrorForInvalidValue(value: string): void {
    throw new InvalidArgumentError(`${value} is not a valid role`);
  }
}
