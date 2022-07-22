import { MongoUserRepository } from '../infrastructure/persistence/MongoUserRepository';

export class GetAllUsers {
  private repository: MongoUserRepository;

  constructor(repository: MongoUserRepository) {
    this.repository = repository;
  }

  public run = async() => {
    return await this.repository.searchAll();
  };
}
