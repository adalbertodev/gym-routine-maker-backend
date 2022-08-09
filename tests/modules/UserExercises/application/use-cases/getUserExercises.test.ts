import { usersExercisesData } from '../../__fixtures__/UserExercisesData';
import { UserExercisesRepositoryMock } from '../../__mocks__/UserExercisesRepositoryMock';
import { UserId } from '../../../../../src/modules/Shared/domain/UserId';
import { getUserExercises } from '../../../../../src/modules/UserExercises/application/use-cases/getUserExercises';
import { UserExercisesNotExist } from '../../../../../src/modules/UserExercises/domain/Errors';
import { UserIdMother } from '../../../Shared/domain/UserIdMother';

describe('getUserExercises', () => {
  let repository: UserExercisesRepositoryMock;

  beforeEach(() => {
    repository = new UserExercisesRepositoryMock();
  });

  test('should return an user exercises with the input id', async() => {
    repository.whenSearchThenReturn(usersExercisesData[0]);

    const userId = new UserId(usersExercisesData[0]._id);
    const exercise = await getUserExercises(userId, repository);

    expect(exercise._id.value).toBe(userId.value);
    repository.assertLastSearchedById(userId);
  });

  test('should throw error if not find user exercises with the id', async() => {
    repository.whenSearchThenReturn(null);

    const userId = UserIdMother.random();

    try {
      const exercise = await getUserExercises(userId, repository);
      expect(exercise).toBeNull();
    } catch (error) {
      expect(error).toBeInstanceOf(UserExercisesNotExist);
    }
    repository.assertLastSearchedById(userId);
  });
});
