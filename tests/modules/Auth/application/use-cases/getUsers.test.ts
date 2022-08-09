import { getUsers } from '../../../../../src/modules/Auth/application/use-cases/getUsers';
import { usersData } from '../../__fixtures__/UsersFixtures';
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock';

describe('getUsers', () => {
  let repository: UserRepositoryMock;

  beforeEach(() => {
    repository = new UserRepositoryMock();
  });

  test('should return a users array', async() => {
    repository.whenSearchThenReturn(usersData);
    console.log(usersData);

    const users = await getUsers(repository);

    expect(users.length).toBe(usersData.length);
    repository.assertLastSearched();
  });
});
