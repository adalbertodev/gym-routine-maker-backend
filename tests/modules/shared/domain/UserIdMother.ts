import { UserId } from '../../../../src/modules/Shared/domain/UserId';
import { UuidMother } from './UuidMother';

export class UserIdMother {
  public static create = (value: string): UserId => {
    return new UserId(value);
  };

  public static random = (): UserId => {
    return this.create(UuidMother.random());
  };
}
