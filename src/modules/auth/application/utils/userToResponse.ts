import { UserPrimitive } from '../../domain/interfaces/UserPrimitive';
import { User } from '../../domain/User';
import { UserResponse } from '../interfaces/AuthResponse';

export const userToResponse = (user: User): UserResponse => {
  return {
    id: user._id.value,
    name: user.name.value,
    email: user.email.value,
    role: user.role.value
  }
  ;
};

export const userPrimitiveToResponse = (userPrimitive: UserPrimitive): UserResponse => {
  return {
    id: userPrimitive._id,
    name: userPrimitive.name,
    email: userPrimitive.email,
    role: userPrimitive.role
  };
};
