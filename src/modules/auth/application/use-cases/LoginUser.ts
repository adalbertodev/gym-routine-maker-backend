import bcrypt from 'bcryptjs';

import { FailedUserCredentials } from '../../domain/Errors';
import { User, UserEmail, UserRepository } from '../../domain/User';

export class LoginUser {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public run = async({ email, password }: {email: string, password: string}): Promise<User> => {
    const userPrimitive = await this.repository.searchByEmail(new UserEmail(email));

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
}
