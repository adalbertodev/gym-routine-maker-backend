import bcrypt from 'bcryptjs';

import { InvalidArgumentError } from '../../../shared/domain/value-object/InvalidArgumentError';
import { UserId } from '../../../shared/domain/UserId';
import { User, UserEmail, UserRepository } from '../../domain/User';
import { UserAlreadyExists } from '../../domain/Errors';

export const registerUser = async(repository: UserRepository, {
  name,
  email,
  password,
  repeatedPassword
}: {
  name: string;
  email: string;
  password: string;
  repeatedPassword: string;
}): Promise<User> => {
  const userPrimitive = await repository.searchByEmail(
    new UserEmail(email)
  );

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
    role: 'user'
  });

  await repository.save(newUser);

  return newUser;
};
