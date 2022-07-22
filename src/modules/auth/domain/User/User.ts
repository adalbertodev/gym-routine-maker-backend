import { ObjectDB } from '../../../shared/domain/ObjectDB';
import { UserEmail } from './UserEmail';
import { UserId } from '../../../shared/domain/UserId';
import { UserName } from './UserName';
import { UserPrimitive } from './UserPrimitive';
import { UserPassword } from './UserPassword';
import { UserRole } from './UserRole';

export class User extends ObjectDB {
  readonly _id: UserId;
  readonly name: UserName;
  readonly email: UserEmail;
  readonly password: UserPassword;
  readonly role: UserRole;

  constructor(id: UserId, name: UserName, email: UserEmail, password: UserPassword, role: UserRole) {
    super();
    this._id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  public static fromPrimitiveObject = ({ _id, name, email, password, role }: UserPrimitive) => {
    return new User(
      new UserId(_id),
      new UserName(name),
      new UserEmail(email),
      new UserPassword(password),
      new UserRole(role));
  };

  public static fromPrimitives = (id: string, name: string, email: string, password: string, role: string) => {
    return new User(
      new UserId(id),
      new UserName(name),
      new UserEmail(email),
      new UserPassword(password),
      new UserRole(role));
  };

  public toPrimitives = (): UserPrimitive => {
    return new UserPrimitive(this._id.value, this.name.value, this.email.value, this.password.value, this.role.value);
  };
}
