import { MongoClientFactory } from '../../../Shared/infrastructure/persistence/mongo/MongoClientFactory';
import { MongoConfigFactory } from '../../../Shared/infrastructure/persistence/mongo/MongoConfigFactory';
import { MongoUserExercisesRepository } from './mongo/MongoUserExercisesRepository';

export class UserExercisesConnectionManager {
  private static defaultContextName = process.env.NODE_ENV || 'dev';

  public static connect = (contextName: string = this.defaultContextName) => {
    const mongoConfig = MongoConfigFactory.createConfig();
    const client = MongoClientFactory.createClient(contextName, mongoConfig);
    return new MongoUserExercisesRepository(client);
  };

  public static disconnect = async(contextName: string = this.defaultContextName) => {
    await MongoClientFactory.closeClient(contextName);
  };
}
