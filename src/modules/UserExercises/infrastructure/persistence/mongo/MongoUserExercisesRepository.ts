import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { UserExercises, UserExercisesRepository } from '../../../domain/UserExercises';
import { UserExercisesPrimitive } from '../../../domain/interfaces';
import { UserId } from '../../../../Shared/domain/UserId';

export class MongoUserExercisesRepository extends MongoRepository<UserExercises> implements UserExercisesRepository {
  public save = (userExercise: UserExercises): Promise<void> => {
    return this.persist(userExercise._id.value, userExercise);
  };

  public searchAll = async(): Promise<UserExercisesPrimitive[]> => {
    const collection = await this.collection();
    const documents = await collection.find<UserExercisesPrimitive>({}).toArray();

    return documents;
  };

  public search = async(userId: UserId): Promise<Nullable<UserExercisesPrimitive>> => {
    const collection = await this.collection();
    const document = await collection.findOne<UserExercisesPrimitive>({ _id: userId.value });

    return document;
  };

  public delete = async(userId: UserId) => {
    const collection = await this.collection();
    const document = await collection.findOneAndDelete({ _id: userId.value });

    return document.value as Nullable<UserExercisesPrimitive>;
  };

  public reset = async() => {
    if (process.env.NODE_ENV !== 'dev') {
      return;
    }

    const collection = await this.collection();
    await collection.deleteMany({});
  };

  protected moduleName(): string {
    return 'user_exercises';
  }
}
