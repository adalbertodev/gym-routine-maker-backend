import { User } from './User';
import { UserPrimitive } from './UserPrimitive';

export class UserResponse {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: string;

  constructor(id: string, name: string, email: string, role: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  public static fromUser = (user: User): UserResponse => {
    return new UserResponse(
      user._id.value,
      user.name.value,
      user.email.value,
      user.role.value
    );
  };

  public static fromUserPrimitive = (userPrimitive: UserPrimitive): UserResponse => {
    return new UserResponse(
      userPrimitive._id,
      userPrimitive.name,
      userPrimitive.email,
      userPrimitive.role
    );
  };
}
