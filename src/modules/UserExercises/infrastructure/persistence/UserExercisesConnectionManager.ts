import { MongoClientFactory } from '../../../Shared/infrastructure/persistence/mongo/MongoClientFactory';
import { MongoConfigFactory } from '../../../Shared/infrastructure/persistence/mongo/MongoConfigFactory';
import { MongoUserExercisesRepository } from './mongo/MongoUserExercisesRepository';

export class UserExercisesConnectionManager {
  private static dbName = 'gym-routine-DB';

  public static connect = () => {
    const mongoConfig = MongoConfigFactory.createConfig();
    const client = MongoClientFactory.createClient(this.dbName, mongoConfig);
    return new MongoUserExercisesRepository(client);
  };

  public static disconnect = async() => {
    await MongoClientFactory.closeClient(this.dbName);
  };
}
