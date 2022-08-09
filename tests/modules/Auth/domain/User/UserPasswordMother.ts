import bcrypt from 'bcryptjs';

import { UserPassword } from '../../../../../src/modules/Auth/domain/User';
import { WordMother } from '../../../Shared/domain/WordMother';

export class UserPasswordMother {
  public static create = (value: string): UserPassword => {
    const hashedValue = bcrypt.hashSync(value);
    return new UserPassword(hashedValue);
  };

  public static random = (): UserPassword => {
    return this.create(WordMother.random());
  };
}
