import { EnvironmentArranger } from '../../../../Shared/infrastructure/persistence/arranger/EnvironmentArranger';
import { MongoClientFactory } from '../../../../../../src/modules/Shared/infrastructure/persistence/mongo/MongoClientFactory';
import { MongoEnvironmentArranger } from '../../../../Shared/infrastructure/persistence/mongo/MongoEnvironmentArranger';
import { MongoUserExercisesRepository } from '../../../../../../src/modules/UserExercises/infrastructure/persistence/mongo/MongoUserExercisesRepository';
import { UserExercisesMother } from '../../../domain/UserExercises/UserExercisesMother';
import { UserExercisesRepository } from '../../../../../../src/modules/UserExercises/domain/UserExercises';
import { MongoConfigFactory } from '../../../../../../src/modules/Shared/infrastructure/persistence/mongo/MongoConfigFactory';

describe('MongoUserExercisesRepository', () => {
  const config = MongoConfigFactory.createConfig();
  const client = MongoClientFactory.createClient('test', config);
  const repository: UserExercisesRepository = new MongoUserExercisesRepository(client);
  const environmentArranger: EnvironmentArranger = new MongoEnvironmentArranger(client);

  beforeEach(async() => {
    await environmentArranger.arrange();
  });

  afterAll(async() => {
    await environmentArranger.arrange();
    await environmentArranger.close();
  });

  describe('#save', () => {
    test('should save a exercise', async() => {
      const userExercises = UserExercisesMother.random();

      await repository.save(userExercises);
      expect(await repository.search(userExercises._id)).toEqual(userExercises.toPrimitives());
    });
  });

  describe('#searchAll', () => {
    test('should return all users exercises of db', async() => {
      const usersExercisesExpected = [UserExercisesMother.random(), UserExercisesMother.random()];
      const usersExercisesPrimitiveExpected = usersExercisesExpected.map(exerciseExpected =>
        exerciseExpected.toPrimitives()
      );

      for (const userExercises of usersExercisesExpected) {
        await repository.save(userExercises);
      }

      const usersExercises = await repository.searchAll();

      expect(usersExercises).toEqual(usersExercisesPrimitiveExpected);
    });
  });

  describe('#search', () => {
    test('should return the exercise with the given id', async() => {
      const exercisesExpected = [UserExercisesMother.random(), UserExercisesMother.random()];
      const id = exercisesExpected[0]._id;
      const userExercisesPrimitiveExpected = exercisesExpected
        .map(exerciseExpected => exerciseExpected.toPrimitives())
        .find(exerciseExpected => exerciseExpected._id === id.value);

      for (const exercise of exercisesExpected) {
        await repository.save(exercise);
      }

      const userExercises = await repository.search(id);

      expect(userExercises).toEqual(userExercisesPrimitiveExpected);
    });
  });

  describe('#delete', () => {
    test('should return the exercise deleted', async() => {
      const userExercisesExpected = UserExercisesMother.random();

      await repository.save(userExercisesExpected);
      const deletedUserExercises = await repository.delete(userExercisesExpected._id);

      expect(deletedUserExercises).toEqual(userExercisesExpected.toPrimitives());
    });

    test('should to be deleted of the database', async() => {
      const userExercisesExpected = UserExercisesMother.random();

      await repository.save(userExercisesExpected);
      await repository.delete(userExercisesExpected._id);

      const searchExercise = await repository.search(userExercisesExpected._id);

      expect(searchExercise).toBeNull();
    });
  });
});
