import bcrypt from 'bcryptjs';

import { InvalidArgumentError } from '../../shared/domain/value-object/InvalidArgumentError';
import { UserId } from '../../shared/domain/UserId';
import { User, UserAlreadyExists, UserEmail, UserRepository } from '../domain/User';

export class RegisterUser {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public run = async({ name, email, password, repeatedPassword }:
    {name: string, email: string, password: string, repeatedPassword: string}): Promise<User> => {
    const userPrimitive = await this.repository.searchByEmail(new UserEmail(email));

    if (userPrimitive) {
      console.log('El email ya existe');
      throw new UserAlreadyExists(userPrimitive._id);
    };

    if (password !== repeatedPassword) {
      throw new InvalidArgumentError('Las contraseñas deben ser iguales');
    }

    const newUser = User.fromPrimitives(
      UserId.random().value,
      name,
      email,
      bcrypt.hashSync(password),
      'user'
    );

    await this.repository.save(newUser);

    return newUser;
  };
}
