import bcrypt from 'bcryptjs';

import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { User, UserEmail, UserRepository } from '../../domain/User';
import { UserAlreadyExists } from '../../domain/Errors';
import { UserId } from '../../../Shared/domain/UserId';
import { UserRoles } from '../../domain/interfaces';
import { RegisterBody } from '../interfaces';

export const registerUser = async(
  { name, email, password, repeatedPassword }: RegisterBody,
  repository: UserRepository
): Promise<User> => {
  const userPrimitive = await repository.searchByEmail(new UserEmail(email));

  if (userPrimitive) {
    console.log('El email ya existe');
    throw new UserAlreadyExists(userPrimitive._id);
  }

  if (password !== repeatedPassword) {
    throw new InvalidArgumentError('Las contraseñas deben ser iguales');
  }

  const newUser = User.fromPrimitives({
    _id: UserId.random().value,
    name,
    email,
    password: bcrypt.hashSync(password),
    role: UserRoles.USER
  });

  await repository.save(newUser);

  return newUser;
};
