import { FailedUserCredentials } from '../domain/FailedUserCredentials';
import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserRepository } from '../domain/UserRepository';

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

    if (userPrimitive.password !== password) {
      console.log('La contraseña es incorrecta');
      throw new FailedUserCredentials();
    };

    return User.fromPrimitiveObject(userPrimitive);
  };
}
