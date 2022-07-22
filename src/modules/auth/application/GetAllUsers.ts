import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class GetAllUsers {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public run = async() => {
    const usersPrimitive = await this.repository.searchAll();
    return usersPrimitive.map((userPrimitive) => User.fromPrimitiveObject(userPrimitive));
  };
}
