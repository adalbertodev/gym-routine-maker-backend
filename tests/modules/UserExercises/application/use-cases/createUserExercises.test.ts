import { createUserExercises } from '../../../../../src/modules/UserExercises/application/use-cases/createUserExercises';
import { UserExercisesAlreadyExists } from '../../../../../src/modules/UserExercises/domain/Errors/UserExercisesAlreadyExists';
import { UserExercisesRepositoryMock } from '../../__mocks__/UserExercisesRepositoryMock';
import { UserId } from '../../../../../src/modules/Shared/domain/UserId';
import { usersExercisesData } from '../../__fixtures__/UsersExercisesFixtures';

describe('createUserExercises', () => {
  let repository: UserExercisesRepositoryMock;

  beforeEach(() => {
    repository = new UserExercisesRepositoryMock();
  });

  test('should return a new User Exercises and save it', async() => {
    const userId = usersExercisesData[0]._id;

    repository.whenSearchThenReturn(null);

    const newUserExercises = await createUserExercises(new UserId(userId), repository);

    expect(newUserExercises._id.value).toBe(userId);
    expect(newUserExercises.exercises.length).toBe(0);
    repository.assertLastSaved(newUserExercises);
  });

  test('should throw an error if already exists a user with the given id', async() => {
    const userId = usersExercisesData[0]._id;

    repository.whenSearchThenReturn(usersExercisesData[0]);

    try {
      const newUserExercises = await createUserExercises(new UserId(userId), repository);
      expect(newUserExercises).toBeNull();
    } catch (error) {
      expect(error).toBeInstanceOf(UserExercisesAlreadyExists);
    }
  });
});
