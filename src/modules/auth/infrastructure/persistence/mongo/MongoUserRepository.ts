import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { User, UserEmail, UserRepository } from '../../../domain/User';
import { UserId } from '../../../../Shared/domain/UserId';
import { UserPrimitive } from '../../../domain/interfaces';

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

  public reset = async() => {
    if (process.env.NODE_ENV !== 'dev') {
      return;
    }

    const collection = await this.collection();
    await collection.deleteMany({});
  };

  protected moduleName(): string {
    return 'users';
  }
}
