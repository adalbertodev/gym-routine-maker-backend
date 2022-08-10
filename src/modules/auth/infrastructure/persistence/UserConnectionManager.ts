import { MongoClientFactory } from '../../../Shared/infrastructure/persistence/mongo/MongoClientFactory';
import { MongoConfigFactory } from '../../../Shared/infrastructure/persistence/mongo/MongoConfigFactory';
import { MongoUserRepository } from './mongo/MongoUserRepository';

export class UserConnectionManager {
  private static defaultContextName = process.env.NODE_ENV || 'dev';

  public static connect = (contextName: string = this.defaultContextName) => {
    const mongoConfig = MongoConfigFactory.createConfig();
    const client = MongoClientFactory.createClient(contextName, mongoConfig);
    return new MongoUserRepository(client);
  };

  public static disconnect = async(contextName: string = this.defaultContextName) => {
    await MongoClientFactory.closeClient(contextName);
  };
}
