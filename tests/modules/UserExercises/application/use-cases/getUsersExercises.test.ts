import { getUsersExercises } from '../../../../../src/modules/UserExercises/application/use-cases/getUsersExercises';
import { UserExercisesRepositoryMock } from '../../__mocks__/UserExercisesRepositoryMock';
import { usersExercisesData } from '../../__fixtures__/UsersExercisesFixtures';

describe('getUsersExercises', () => {
  let repository: UserExercisesRepositoryMock;

  beforeEach(() => {
    repository = new UserExercisesRepositoryMock();
  });

  test('should return a users exercises array', async() => {
    repository.whenSearchThenReturn(usersExercisesData);

    const exercises = await getUsersExercises(repository);

    expect(exercises.length).toBe(usersExercisesData.length);
    repository.assertLastSearched();
  });
});
