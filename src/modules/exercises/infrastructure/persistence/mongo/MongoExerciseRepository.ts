import { MongoRepository } from '../../../../shared/infrastructure/persistence/mongo/MongoRepository';
import { Nullable } from '../../../../shared/domain/Nullable';
import { Exercise, ExerciseId, ExerciseRepository } from '../../../domain/Exercise';
import { ExercisePrimitive } from '../../../domain/interfaces';
import { UserId } from '../../../../shared/domain/UserId';

export class MongoExerciseRepository extends MongoRepository<Exercise> implements ExerciseRepository {
  public save = (exercise: Exercise): Promise<void> => {
    return this.persist(exercise._id.value, exercise);
  };

  public searchAll = async(): Promise<ExercisePrimitive[]> => {
    const collection = await this.collection();
    const documents = await collection.find<ExercisePrimitive>({}).toArray();

    return documents;
  };

  public searchByUser = async(userId: UserId): Promise<ExercisePrimitive[]> => {
    const collection = await this.collection();
    const documents = await collection
      .find<ExercisePrimitive>({ $or: [{ userId }, { userId: null }] })
      .toArray();

    return documents;
  };

  public search = async(id: ExerciseId): Promise<Nullable<ExercisePrimitive>> => {
    const collection = await this.collection();
    const document = await collection.findOne<ExercisePrimitive>({ _id: id.value });

    return document;
  };

  public reset = async() => {
    const collection = await this.collection();
    await collection.deleteMany({});
  };

  protected moduleName(): string {
    return 'exercises';
  }
}
