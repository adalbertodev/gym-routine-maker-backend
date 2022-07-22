import { MongoRepository } from '../../../shared/infrastructure/mongo/MongoRepository';
import { Nullable } from '../../../shared/domain/Nullable';
import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { UserId } from '../../../shared/domain/UserId';
import { UserPrimitive } from '../../domain/UserPrimitive';
import { UserRepository } from '../../domain/UserRepository';

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  public save = (user: User): Promise<void> => {
    return this.persist(user._id.value, user);
  };

  public searchAll = async(): Promise<UserPrimitive[]> => {
    const collection = await this.collection();
    const documents = await collection.find<UserPrimitive>({}).toArray();

    return documents;
  };

  public search = async(id: UserId): Promise<Nullable<UserPrimitive>> => {
    const collection = await this.collection();
    const document = await collection.findOne<UserPrimitive>({ _id: id.value });

    return document;
  };

  public searchByEmail = async(email: UserEmail): Promise<Nullable<UserPrimitive>> => {
    const collection = await this.collection();
    const document = await collection.findOne<UserPrimitive>({ email: email.value });

    return document;
  };

  protected moduleName(): string {
    return 'users';
  }
}
