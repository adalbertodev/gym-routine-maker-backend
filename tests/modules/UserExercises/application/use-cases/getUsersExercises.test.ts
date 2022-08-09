import { usersExercisesData } from '../../__fixtures__/UserExercisesData';
import { UserExercisesRepositoryMock } from '../../__mocks__/UserExercisesRepositoryMock';
import { getUsersExercises } from '../../../../../src/modules/UserExercises/application/use-cases/getUsersExercises';

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
