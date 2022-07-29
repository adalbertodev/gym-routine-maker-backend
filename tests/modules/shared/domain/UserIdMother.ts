import { UserId } from '../../../../src/modules/shared/domain/UserId';
import { UuidMother } from './UuidMother';

export class UserIdMother {
  public static create = (value: string): UserId => {
    return new UserId(value);
  };

  public static random = (): UserId => {
    return this.create(UuidMother.random());
  };
}
