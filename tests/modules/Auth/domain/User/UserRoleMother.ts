import { EnumMother } from '../../../Shared/domain/EnumMother';
import { UserRole } from '../../../../../src/modules/Auth/domain/User';
import { UserRoles } from '../../../../../src/modules/Auth/domain/interfaces';

export class UserRoleMother {
  public static create = (value: string): UserRole => {
    return new UserRole(value);
  };

  public static random = (): UserRole => {
    return this.create(EnumMother.random(Object.values(UserRoles)));
  };
}
