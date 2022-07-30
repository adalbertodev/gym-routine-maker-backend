import { User } from '../../domain/User';
import { UserPrimitive } from '../../domain/interfaces';
import { ResponseUser } from '../interfaces';

export const userToResponseUser = (user: User): ResponseUser => {
  return {
    id: user._id.value,
    name: user.name.value,
    email: user.email.value,
    role: user.role.value
  };
};

export const userPrimitiveToResponseUser = (userPrimitive: UserPrimitive): ResponseUser => {
  return {
    id: userPrimitive._id,
    name: userPrimitive.name,
    email: userPrimitive.email,
    role: userPrimitive.role
  };
};
