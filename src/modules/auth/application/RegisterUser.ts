import { InvalidArgumentError } from '../../shared/domain/value-object/InvalidArgumentError';
import { User } from '../domain/User';
import { UserAlreadyExists } from '../domain/UserAlreadyExists';
import { UserEmail } from '../domain/UserEmail';
import { UserId } from '../../shared/domain/UserId';
import { UserRepository } from '../domain/UserRepository';

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

    const newUser = User.fromPrimitives(UserId.random().value, name, email, password, 'user');

    await this.repository.save(newUser);

    return newUser;
  };
}
