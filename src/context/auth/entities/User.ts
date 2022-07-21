import { ObjectDB } from '../../shared/entities/ObjectDB';
import { PrimitiveObject } from '../../shared/entities/PrimitiveObject';
import { UserId } from '../../shared/entities/UserId';
import { UserName } from './UserName';
import { UserPrimitive } from './UserPrimitive';

export class User extends ObjectDB {
  readonly id: UserId;
  readonly name: UserName;

  constructor(id: UserId, name: UserName) {
    super();
    this.id = id;
    this.name = name;
  }

  public static fromPrimitiveObject = ({ id, name }: UserPrimitive) => {
    return new User(new UserId(id), new UserName(name));
  };

  public static fromPrimitives = (id: string, name: string) => {
    return new User(new UserId(id), new UserName(name));
  };

  public toPrimitives = (): PrimitiveObject => {
    return new UserPrimitive(this.id.value, this.name.value);
  };
}
