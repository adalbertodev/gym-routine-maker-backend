import { MongoClientFactory } from './mongo/MongoClientFactory';
import { MongoUserRepository } from '../../../auth/infrastructure/persistence/mongo/MongoUserRepository';
import { MongoConfigFactory } from './mongo/MongoConfigFactory';

export class ConnectionManager {
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
