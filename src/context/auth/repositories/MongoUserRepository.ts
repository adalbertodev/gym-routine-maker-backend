import { Nullable } from '../../shared/entities/Nullable';
import { UserId } from '../../shared/entities/UserId';
import { MongoRepository } from '../../shared/repositories/mongo/MongoRepository';
import { User } from '../entities/User';
import { UserPrimitive } from '../entities/UserPrimitive';
import { UserRepository } from './UserRepository';

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  public save = (user: User): Promise<void> => {
    return this.persist(user.id.value, user);
  };

  public searchAll = async(): Promise<Nullable<User[]>> => {
    const collection = await this.collection();
    const documents = await collection.find<{_id: string, name: string}>({}).toArray();

    return documents ? documents.map((document) => User.fromPrimitives(document._id, document.name)) : null;
  };

  public search = async(id: UserId): Promise<Nullable<User>> => {
    const collection = await this.collection();
    const document = await collection.findOne<UserPrimitive>({ _id: id.value });

    return document ? User.fromPrimitives(id.value, document.name) : null;
  };

  protected moduleName(): string {
    return 'users';
  }
}
