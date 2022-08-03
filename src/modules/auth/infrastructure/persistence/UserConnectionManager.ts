import { MongoClientFactory } from '../../../Shared/infrastructure/persistence/mongo/MongoClientFactory';
import { MongoUserRepository } from './mongo/MongoUserRepository';
import { MongoConfigFactory } from '../../../Shared/infrastructure/persistence/mongo/MongoConfigFactory';

export class UserConnectionManager {
  private static dbName = 'gym-routine-DB';

  public static connect = () => {
    const mongoConfig = MongoConfigFactory.createConfig();
    const client = MongoClientFactory.createClient(this.dbName, mongoConfig);
    return new MongoUserRepository(client);
  };

  public static disconnect = async() => {
    await MongoClientFactory.closeClient(this.dbName);
  };
}
