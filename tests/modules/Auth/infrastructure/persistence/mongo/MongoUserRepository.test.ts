import { EnvironmentArranger } from '../../../../Shared/infrastructure/persistence/arranger/EnvironmentArranger';
import { MongoClientFactory } from '../../../../../../src/modules/Shared/infrastructure/persistence/mongo/MongoClientFactory';
import { MongoEnvironmentArranger } from '../../../../Shared/infrastructure/persistence/mongo/MongoEnvironmentArranger';
import { MongoUserRepository } from '../../../../../../src/modules/Auth/infrastructure/persistence/mongo/MongoUserRepository';
import { UserMother } from '../../../domain/User';
import { UserRepository } from '../../../../../../src/modules/Auth/domain/User';
import { MongoConfigFactory } from '../../../../../../src/modules/Shared/infrastructure/persistence/mongo/MongoConfigFactory';

describe('MongoUserRepository', () => {
  const config = MongoConfigFactory.createConfig();
  const client = MongoClientFactory.createClient('test', config);
  const repository: UserRepository = new MongoUserRepository(client);
  const environmentArranger: EnvironmentArranger = new MongoEnvironmentArranger(client);

  beforeEach(async() => {
    await environmentArranger.arrange();
  });

  afterAll(async() => {
    await environmentArranger.arrange();
    await environmentArranger.close();
  });

  describe('#save', () => {
    test('should save a user', async() => {
      const user = UserMother.random();

      await repository.save(user);
      expect(await repository.search(user._id)).toEqual(user.toPrimitives());
    });
  });

  describe('#searchAll', () => {
    test('should return all users of db', async() => {
      const usersExpected = [UserMother.random(), UserMother.random()];
      const usersPrimitiveExpected = usersExpected.map(exerciseExpected =>
        exerciseExpected.toPrimitives()
      );

      for (const user of usersExpected) {
        await repository.save(user);
      }

      const usersExercises = await repository.searchAll();

      expect(usersExercises).toEqual(usersPrimitiveExpected);
    });
  });

  describe('#search', () => {
    test('should return the user with the given id', async() => {
      const usersExpected = [UserMother.random(), UserMother.random()];
      const id = usersExpected[0]._id;
      const userPrimitiveExpected = usersExpected
        .map(userExpected => userExpected.toPrimitives())
        .find(userExpected => userExpected._id === id.value);

      for (const user of usersExpected) {
        await repository.save(user);
      }

      const user = await repository.search(id);

      expect(user).toEqual(userPrimitiveExpected);
    });
  });

  describe('#searchByEmail', () => {
    test('should return the user with the given email', async() => {
      const usersExpected = [UserMother.random(), UserMother.random()];
      const email = usersExpected[0].email;
      const userPrimitiveExpected = usersExpected
        .map(userExpected => userExpected.toPrimitives())
        .find(userExpected => userExpected.email === email.value);

      for (const user of usersExpected) {
        await repository.save(user);
      }

      const user = await repository.searchByEmail(email);

      expect(user).toEqual(userPrimitiveExpected);
    });
  });

  describe('#delete', () => {
    test('should return the user deleted', async() => {
      const userExpected = UserMother.random();

      await repository.save(userExpected);
      const deletedUser = await repository.delete(userExpected._id);

      expect(deletedUser).toEqual(userExpected.toPrimitives());
    });

    test('should to be deleted of the database', async() => {
      const userExpected = UserMother.random();

      await repository.save(userExpected);
      await repository.delete(userExpected._id);

      const searchedUser = await repository.search(userExpected._id);

      expect(searchedUser).toBeNull();
    });
  });
});
