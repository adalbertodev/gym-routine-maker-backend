import { User } from '../../domain/User';
import { ResponseUser } from '../interfaces';

export const convertToResponseUser = (user: User): ResponseUser => {
  return {
    id: user._id.value,
    name: user.name.value,
    email: user.email.value,
    role: user.role.value
  };
};
