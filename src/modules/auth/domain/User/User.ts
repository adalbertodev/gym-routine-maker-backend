import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UserEmail, UserName, UserPassword, UserRole } from './';
import { UserId } from '../../../shared/domain/UserId';
import { UserPrimitive } from '../interfaces';

export class User extends AggregateRoot {
  readonly _id: UserId;
  readonly name: UserName;
  readonly email: UserEmail;
  readonly password: UserPassword;
  readonly role: UserRole;

  constructor(
    id: UserId,
    name: UserName,
    email: UserEmail,
    password: UserPassword,
    role: UserRole
  ) {
    super();
    this._id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  public static fromPrimitives = ({
    _id,
    name,
    email,
    password,
    role
  }: UserPrimitive) => {
    return new User(
      new UserId(_id),
      new UserName(name),
      new UserEmail(email),
      new UserPassword(password),
      new UserRole(role)
    );
  };

  public toPrimitives = (): UserPrimitive => {
    return {
      _id: this._id.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      role: this.role.value
    };
  };
}
