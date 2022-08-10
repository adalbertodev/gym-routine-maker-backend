import bcrypt from 'bcryptjs';

import { FailedUserCredentials } from '../../../../../src/modules/Auth/domain/Errors';
import { LoginRequestBody } from '../../../../../src/modules/Auth/application/interfaces';
import { loginUser } from '../../../../../src/modules/Auth/application/use-cases/loginUser';
import { User, UserEmail } from '../../../../../src/modules/Auth/domain/User';
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock';
import { usersData } from '../../__fixtures__/UsersFixtures';
import { UuidMother } from '../../../Shared/domain/UuidMother';

describe('loginUser', () => {
  let repository: UserRepositoryMock;

  beforeEach(() => {
    repository = new UserRepositoryMock();
  });

  test('should return a user given the correct credentials', async() => {
    const password = 'test';
    const user = User.fromPrimitives({ _id: UuidMother.random(), name: 'test', email: 'test@test.com', password: bcrypt.hashSync(password), role: 'user' });

    const loginBody: LoginRequestBody = { email: user.email.value, password };

    repository.whenSearchThenReturn(user.toPrimitives());

    const loggedUser = await loginUser(loginBody, repository);

    expect(loggedUser._id.value).toBe(user._id.value);
    expect(loggedUser.name.value).toBe(user.name.value);
    expect(loggedUser.email.value).toBe(user.email.value);
    expect(loggedUser.password.value).toBe(user.password.value);
    expect(loggedUser.role.value).toBe(user.role.value);
    repository.assertLastSearchedByEmail(user.email);
  });

  test('should throw an error if not exist user with the given email', async() => {
    const user = usersData[0];

    const loginBody: LoginRequestBody = { email: user.email, password: user.password };

    repository.whenSearchThenReturn(null);

    try {
      const loggedUser = await loginUser(loginBody, repository);
      expect(loggedUser).toBeNull();
    } catch (error) {
      expect(error).toBeInstanceOf(FailedUserCredentials);
    }
    repository.assertLastSearchedByEmail(new UserEmail(user.email));
  });

  test('should throw an error if the password is not correct', async() => {
    const password = 'test';
    const user = User.fromPrimitives({ _id: UuidMother.random(), name: 'test', email: 'test@test.com', password: bcrypt.hashSync('test2'), role: 'user' });

    const loginBody: LoginRequestBody = { email: user.email.value, password };

    repository.whenSearchThenReturn(user.toPrimitives());

    try {
      const loggedUser = await loginUser(loginBody, repository);
      expect(loggedUser).toBeNull();
    } catch (error) {
      expect(error).toBeInstanceOf(FailedUserCredentials);
    }
    repository.assertLastSearchedByEmail(user.email);
  });
});
