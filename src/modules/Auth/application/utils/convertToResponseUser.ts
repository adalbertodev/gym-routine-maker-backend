import { ResponseUser } from '../interfaces';
import { User } from '../../domain/User';

export const convertToResponseUser = (user: User): ResponseUser => {
  return {
    id: user._id.value,
    name: user.name.value,
    email: user.email.value,
    role: user.role.value
  };
};
