import { MongoClientFactory } from '../../../shared/infrastructure/mongo/MongoClientFactory';
import { MongoUserRepository } from './MongoUserRepository';

export class ConnectionManager {
  private static dbName = 'gym-routine-DB';

  public static mongoConnect = () => {
    const url = process.env.MONGO_URL || '';
    const client = MongoClientFactory.createClient(this.dbName, { url });
    return new MongoUserRepository(client);
  };

  public static mongoDisconnect = async() => {
    await MongoClientFactory.closeClient(this.dbName);
  };
}
