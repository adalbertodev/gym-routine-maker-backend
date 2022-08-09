import { UserEmail } from '../../../../../src/modules/Auth/domain/User';
import { WordMother } from '../../../Shared/domain/WordMother';

export class UserEmailMother {
  public static create = (value: string): UserEmail => {
    return new UserEmail(value);
  };

  public static random = (): UserEmail => {
    return this.create(WordMother.randomEmail());
  };
}
