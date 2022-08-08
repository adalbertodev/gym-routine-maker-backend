import { EnvironmentArranger } from '../../../../shared/infrastructure/persistence/arranger/EnvironmentArranger';
import { ExerciseMother } from '../../../domain/Exercise';
import { ExerciseRepository } from '../../../../../../src/modules/UserExercises/domain/UserExercises/ExerciseRepository';
import { MongoClientFactory } from '../../../../../../src/modules/Shared/infrastructure/persistence/mongo/MongoClientFactory';
import { MongoEnvironmentArranger } from '../../../../shared/infrastructure/persistence/mongo/MongoEnvironmentArranger';
import { MongoExerciseRepository } from '../../../../../../src/modules/UserExercises/infrastructure/persistence/mongo/MongoExerciseRepository';
import { UserIdMother } from '../../../../shared/domain/UserIdMother';

describe('MongoExerciseRepository', () => {
  const client = MongoClientFactory.createClient('test', { url: process.env.MONGO_URL || '' });
  const repository: ExerciseRepository = new MongoExerciseRepository(client);
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
      const exercise = ExerciseMother.random();

      await repository.save(exercise);
      expect(await repository.search(exercise._id)).toEqual(exercise.toPrimitives());
    });
  });

  describe('#searchAll', () => {
    test('should return all exercises of db', async() => {
      const exercisesExpected = [ExerciseMother.random(), ExerciseMother.random()];
      const exercisesPrimitiveExpected = exercisesExpected.map(exerciseExpected =>
        exerciseExpected.toPrimitives()
      );

      for (const exercise of exercisesExpected) {
        await repository.save(exercise);
      }

      const exercises = await repository.searchAll();

      expect(exercises).toEqual(exercisesPrimitiveExpected);
    });
  });

  describe('#searchByUser', () => {
    test('should return the exercises with given userId', async() => {
      const exercisesExpected = [
        ExerciseMother.random({ userId: true }),
        ExerciseMother.random({ userId: true })
      ];
      const userId = exercisesExpected[0].userId!;
      const exercisesPrimitiveExpected = exercisesExpected
        .map(exerciseExpected => exerciseExpected.toPrimitives())
        .filter(exerciseExpected => exerciseExpected.userId === userId.value);

      for (const exercise of exercisesExpected) {
        await repository.save(exercise);
      }

      const exercises = await repository.searchByUser(userId);

      expect(exercises).toEqual(exercisesPrimitiveExpected);
    });

    test('should return the exercises with userId null', async() => {
      const exercisesExpected = [ExerciseMother.random({ userId: true }), ExerciseMother.random()];
      const userId = UserIdMother.random();
      const exercisesPrimitiveExpected = exercisesExpected
        .map(exerciseExpected => exerciseExpected.toPrimitives())
        .filter(exerciseExpected => exerciseExpected.userId === null);

      for (const exercise of exercisesExpected) {
        await repository.save(exercise);
      }

      const exercises = await repository.searchByUser(userId);

      expect(exercises).toEqual(exercisesPrimitiveExpected);
    });
  });

  describe('#search', () => {
    test('should return the exercise with the given id', async() => {
      const exercisesExpected = [ExerciseMother.random(), ExerciseMother.random()];
      const id = exercisesExpected[0]._id;
      const exercisesPrimitiveExpected = exercisesExpected
        .map(exerciseExpected => exerciseExpected.toPrimitives())
        .find(exerciseExpected => exerciseExpected._id === id.value);

      for (const exercise of exercisesExpected) {
        await repository.save(exercise);
      }

      const exercises = await repository.search(id);

      expect(exercises).toEqual(exercisesPrimitiveExpected);
    });
  });

  describe('#searchByName', () => {
    test('should return the exercise with the given name', async() => {
      const exercisesExpected = [ExerciseMother.random(), ExerciseMother.random()];
      const name = exercisesExpected[0].name;
      const exercisesPrimitiveExpected = exercisesExpected
        .map(exerciseExpected => exerciseExpected.toPrimitives())
        .find(exerciseExpected => exerciseExpected.name === name.value);

      for (const exercise of exercisesExpected) {
        await repository.save(exercise);
      }

      const exercises = await repository.searchByName(name);

      expect(exercises).toEqual(exercisesPrimitiveExpected);
    });
  });

  describe('#delete', () => {
    test('should return the exercise deleted', async() => {
      const exerciseExpected = ExerciseMother.random();

      await repository.save(exerciseExpected);
      const deletedExercise = await repository.delete(exerciseExpected._id);

      expect(deletedExercise).toEqual(exerciseExpected.toPrimitives());
    });

    test('should to be deleted of the database', async() => {
      const exerciseExpected = ExerciseMother.random();

      await repository.save(exerciseExpected);
      await repository.delete(exerciseExpected._id);

      const searchExercise = await repository.search(exerciseExpected._id);

      expect(searchExercise).toBeNull();
    });
  });
});
