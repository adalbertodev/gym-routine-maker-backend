import { UserRepository } from '../../../../../../src/modules/Auth/domain/User';
import { MongoUserRepository } from '../../../../../../src/modules/Auth/infrastructure/persistence/mongo/MongoUserRepository';
import { MongoClientFactory } from '../../../../../../src/modules/Shared/infrastructure/persistence/mongo/MongoClientFactory';
import { EnvironmentArranger } from '../../../../Shared/infrastructure/persistence/arranger/EnvironmentArranger';
import { MongoEnvironmentArranger } from '../../../../Shared/infrastructure/persistence/mongo/MongoEnvironmentArranger';
import { UserMother } from '../../../domain/User';

describe('MongoUserRepository', () => {
  const client = MongoClientFactory.createClient('test', { url: process.env.MONGO_URL || '' });
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
});
