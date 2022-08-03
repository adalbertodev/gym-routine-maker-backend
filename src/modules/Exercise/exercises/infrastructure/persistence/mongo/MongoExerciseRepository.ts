import { MongoRepository } from '../../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { Nullable } from '../../../../../Shared/domain/Nullable';
import { Exercise, ExerciseId, ExerciseName, ExerciseRepository } from '../../../domain/Exercise';
import { ExercisePrimitive } from '../../../domain/interfaces';
import { UserId } from '../../../../../Shared/domain/UserId';

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
      .find<ExercisePrimitive>({ $or: [{ userId: userId.value }, { userId: null }] })
      .toArray();

    return documents;
  };

  public search = async(id: ExerciseId): Promise<Nullable<ExercisePrimitive>> => {
    const collection = await this.collection();
    const document = await collection.findOne<ExercisePrimitive>({ _id: id.value });

    return document;
  };

  public searchByName = async(name: ExerciseName): Promise<Nullable<ExercisePrimitive>> => {
    const collection = await this.collection();
    const document = await collection.findOne<ExercisePrimitive>({ name: name.value });

    return document;
  };

  public delete = async(id: ExerciseId) => {
    const collection = await this.collection();
    const deletedExercise = await collection.findOneAndDelete({ _id: id.value });

    return deletedExercise.value as Nullable<ExercisePrimitive>;
  };

  public reset = async() => {
    const collection = await this.collection();
    await collection.deleteMany({});
  };

  protected moduleName(): string {
    return 'exercises';
  }
}
