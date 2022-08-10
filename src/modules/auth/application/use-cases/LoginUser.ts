import bcrypt from 'bcryptjs';

import { FailedUserCredentials } from '../../domain/Errors';
import { LoginRequestBody } from '../interfaces';
import { User, UserEmail, UserRepository } from '../../domain/User';

export const loginUser = async({ email, password }: LoginRequestBody, repository: UserRepository): Promise<User> => {
  const userPrimitive = await repository.searchByEmail(new UserEmail(email));

  if (!userPrimitive) {
    console.log('El email no existe');
    throw new FailedUserCredentials();
  }

  if (!bcrypt.compareSync(password, userPrimitive.password)) {
    console.log('La contraseña es incorrecta');
    throw new FailedUserCredentials();
  }

  return User.fromPrimitives(userPrimitive);
};
