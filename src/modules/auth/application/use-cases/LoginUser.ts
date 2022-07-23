import bcrypt from 'bcryptjs';

import { FailedUserCredentials } from '../../domain/Errors';
import { User, UserEmail, UserRepository } from '../../domain/User';
import { LoginBody } from '../interfaces/AuthRequest';

export const loginUser = async({ email, password }: LoginBody, repository: UserRepository): Promise<User> => {
  const userPrimitive = await repository.searchByEmail(new UserEmail(email));

  if (!userPrimitive) {
    console.log('El email no existe');
    throw new FailedUserCredentials();
  };

  if (!bcrypt.compareSync(password, userPrimitive.password)) {
    console.log('La contraseña es incorrecta');
    throw new FailedUserCredentials();
  };

  return User.fromPrimitives(userPrimitive);
};
