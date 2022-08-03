import { MongoClientFactory } from '../../../../Shared/infrastructure/persistence/mongo/MongoClientFactory';
import { MongoExerciseRepository } from './mongo/MongoExerciseRepository';
import { MongoConfigFactory } from '../../../../Shared/infrastructure/persistence/mongo/MongoConfigFactory';

export class ExerciseConnectionManager {
  private static dbName = 'gym-routine-DB';

  public static connect = () => {
    const mongoConfig = MongoConfigFactory.createConfig();
    const client = MongoClientFactory.createClient(this.dbName, mongoConfig);
    return new MongoExerciseRepository(client);
  };

  public static disconnect = async() => {
    await MongoClientFactory.closeClient(this.dbName);
  };
}
