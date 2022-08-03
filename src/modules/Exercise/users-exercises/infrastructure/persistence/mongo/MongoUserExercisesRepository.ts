import { MongoRepository } from '../../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { Nullable } from '../../../../../Shared/domain/Nullable';
import { ExercisePrimitive, UserExercisesPrimitive } from '../../../../exercises/domain/interfaces';
import { UserId } from '../../../../../Shared/domain/UserId';
import { UserExercises, UserExercisesRepository } from '../../../domain/UserExercises';
import { PopulatedUserExercisesPrimitive } from '../../../domain/interfaces/PopulatedUserExercisesPrimitive';

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
    const document = await collection.findOneAndDelete({ _userId: userId.value });

    return document.value as Nullable<UserExercisesPrimitive>;
  };

  public populate = async(userExercise: UserExercises) => {
    const collection = await this.collection();
    const aggregation = await collection
      .aggregate([
        {
          $lookup: {
            from: 'exercises',
            localField: 'dryExercises.exercise',
            foreignField: '_id',
            as: 'exercisesToPopulate'
          }
        }
      ])
      .toArray();

    const populatedUserExercise: PopulatedUserExercisesPrimitive = {
      _id: userExercise._id.value,
      exercises: userExercise.dryExercises.map(dryExercise => ({
        exercise: aggregation
          .find(aggregate => aggregate._id === userExercise._id.value)!
          .exercisesToPopulate.find((exercise: any) => exercise._id === dryExercise.exercise.value) as ExercisePrimitive,
        rm: dryExercise.rm ? dryExercise.rm.value : null
      }))
    };

    return populatedUserExercise;
  };

  public reset = async() => {
    const collection = await this.collection();
    await collection.deleteMany({});
  };

  protected moduleName(): string {
    return 'user_exercises';
  }
}
