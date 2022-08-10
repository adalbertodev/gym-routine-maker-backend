import { User, UserEmail, UserName, UserPassword, UserRole } from '../../../../../src/modules/Auth/domain/User';
import { UserEmailMother, UserNameMother, UserPasswordMother, UserRoleMother } from '.';
import { UserId } from '../../../../../src/modules/Shared/domain/UserId';
import { UserIdMother } from '../../../Shared/domain/UserIdMother';

export class UserMother {
  public static create = (_id: UserId, name: UserName, email: UserEmail, password: UserPassword, role: UserRole) => {
    return new User(_id, name, email, password, role);
  };

  public static random = () => {
    return this.create(
      UserIdMother.random(),
      UserNameMother.random(),
      UserEmailMother.random(),
      UserPasswordMother.random(),
      UserRoleMother.random()
    );
  };
}
