import { ObjectDB } from '../../shared/domain/ObjectDB';
import { UserEmail } from './UserEmail';
import { UserId } from '../../shared/domain/UserId';
import { UserName } from './UserName';
import { UserPrimitive } from './UserPrimitive';
import { UserRole } from './UserRole';

export class User extends ObjectDB {
  readonly id: UserId;
  readonly name: UserName;
  readonly email: UserEmail;
  readonly role: UserRole;

  constructor(id: UserId, name: UserName, email: UserEmail, role: UserRole) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  public static fromPrimitiveObject = ({ id, name, email, role }: UserPrimitive) => {
    return new User(new UserId(id), new UserName(name), new UserEmail(email), new UserRole(role));
  };

  public static fromPrimitives = (id: string, name: string, email: string, role: string) => {
    return new User(new UserId(id), new UserName(name), new UserEmail(email), new UserRole(role));
  };

  public toPrimitives = (): UserPrimitive => {
    return new UserPrimitive(this.id.value, this.name.value, this.email.value, this.role.value);
  };
}
