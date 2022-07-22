import { Nullable } from '../../../shared/domain/Nullable';
import { UserId } from '../../../shared/domain/UserId';
import { MongoRepository } from '../../../shared/infrastructure/mongo/MongoRepository';
import { User } from '../../domain/User';
import { UserDB } from '../../interfaces/UserDB';
import { UserRepository } from '../../domain/UserRepository';

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  public save = (user: User): Promise<void> => {
    return this.persist(user.id.value, user);
  };

  public searchAll = async(): Promise<User[]> => {
    const collection = await this.collection();
    const documents = await collection.find<UserDB>({}).toArray();

    return documents.map(({ _id, name, email, role }) => User.fromPrimitives(_id, name, email, role));
  };

  public search = async(id: UserId): Promise<Nullable<User>> => {
    const collection = await this.collection();
    const document = await collection.findOne<UserDB>({ _id: id.value });

    return document ? User.fromPrimitives(id.value, document.name, document.email, document.role) : null;
  };

  protected moduleName(): string {
    return 'users';
  }
}
