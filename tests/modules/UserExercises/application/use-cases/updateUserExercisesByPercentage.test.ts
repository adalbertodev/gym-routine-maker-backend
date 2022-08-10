import { updateUserExercisesRmByPercentage } from '../../../../../src/modules/UserExercises/application/use-cases/updateUserExercisesRmByPercentage';
import { UserExercisesNotExist } from '../../../../../src/modules/UserExercises/domain/Errors';
import { UserExercisesRepositoryMock } from '../../__mocks__/UserExercisesRepositoryMock';
import { UserId } from '../../../../../src/modules/Shared/domain/UserId';
import { usersExercisesData } from '../../__fixtures__/UsersExercisesFixtures';

describe('updateUserExercisesByPercentage', () => {
  let repository: UserExercisesRepositoryMock;

  beforeEach(() => {
    repository = new UserExercisesRepositoryMock();
  });

  test('should update the rm of all user exercises according to the given percentage', async() => {
    const userId = new UserId(usersExercisesData[0]._id);
    const percentage = 0.2;
    const userExercises = usersExercisesData[0];
    repository.whenSearchThenReturn({ ...userExercises });

    const newUserExercises = await updateUserExercisesRmByPercentage(userId, percentage, repository);

    expect(newUserExercises._id.value).toBe(userExercises._id);

    for (const exercise of newUserExercises.exercises) {
      const expectedExercise = userExercises.exercises.find(exercises => exercises._id === exercise._id.value);
      const barWeight = expectedExercise?.barWeight || 0;
      const calculatedNewRm = expectedExercise?.rm ? ((expectedExercise.rm + barWeight) * (1 + percentage)) - barWeight : null;
      const expectedExerciseRm = calculatedNewRm ? Math.floor(calculatedNewRm * 100) / 100 : null;

      expect(exercise.rm?.value || null).toBe(expectedExerciseRm);
    }
  });

  test('should return the same user exercises if the exercises is empty', async() => {
    const userId = new UserId(usersExercisesData[0]._id);
    const percentage = 0.2;
    const userExercises = usersExercisesData[0];
    repository.whenSearchThenReturn({ ...userExercises, exercises: [] });

    const newUserExercises = await updateUserExercisesRmByPercentage(userId, percentage, repository);

    expect(newUserExercises._id.value).toBe(userExercises._id);

    expect(newUserExercises.exercises.length).toBe(0);
  });

  test('should return the rm null if the preview rm was null', async() => {
    const userId = new UserId(usersExercisesData[0]._id);
    const percentage = 0.2;
    const userExercises = { ...usersExercisesData[0], exercises: usersExercisesData[0].exercises.map(exercise => ({ ...exercise, rm: null })) };
    repository.whenSearchThenReturn({ ...userExercises });

    const newUserExercises = await updateUserExercisesRmByPercentage(userId, percentage, repository);

    for (const exercise of newUserExercises.exercises) {
      expect(exercise.rm).toBeNull();
    }
  });

  test('should throw a error if not exist the user exercises', async() => {
    const userId = new UserId(usersExercisesData[0]._id);
    const percentage = 0.2;
    repository.whenSearchThenReturn(null);

    try {
      const newUserExercises = await updateUserExercisesRmByPercentage(userId, percentage, repository);
      expect(newUserExercises).toEqual(null);
    } catch (error) {
      expect(error).toBeInstanceOf(UserExercisesNotExist);
    }
  });
});
