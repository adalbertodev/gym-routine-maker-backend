import bcrypt from 'bcryptjs';

import { RegisterRequestBody } from '../interfaces';
import { User, UserEmail, UserRepository } from '../../domain/User';
import { UserAlreadyExists } from '../../domain/Errors';
import { UserId } from '../../../Shared/domain/UserId';
import { UserRoles } from '../../domain/interfaces';

export const registerUser = async(
  { name, email, password }: RegisterRequestBody,
  repository: UserRepository
): Promise<User> => {
  const userPrimitive = await repository.searchByEmail(new UserEmail(email));

  if (userPrimitive) {
    console.log('El email ya existe');
    throw new UserAlreadyExists(userPrimitive._id);
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
