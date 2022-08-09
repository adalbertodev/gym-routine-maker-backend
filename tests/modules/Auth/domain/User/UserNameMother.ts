import { UserName } from '../../../../../src/modules/Auth/domain/User';
import { WordMother } from '../../../Shared/domain/WordMother';

export class UserNameMother {
  public static create = (value: string): UserName => {
    return new UserName(value);
  };

  public static random = (): UserName => {
    return this.create(WordMother.random());
  };
}
