import bcrypt from 'bcryptjs';

import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock';
import { RegisterBody } from '../../../../../src/modules/Auth/application/interfaces/AuthRequest';
import { usersData } from '../../__fixtures__/UsersFixtures';
import { registerUser } from '../../../../../src/modules/Auth/application/use-cases/registerUser';
import { UserEmail } from '../../../../../src/modules/Auth/domain/User';
import { UserAlreadyExists } from '../../../../../src/modules/Auth/domain/Errors';
import { InvalidArgumentError } from '../../../../../src/modules/Shared/domain/value-object/InvalidArgumentError';

describe('registerUser', () => {
  let repository: UserRepositoryMock;

  beforeEach(() => {
    repository = new UserRepositoryMock();
  });

  test('should return a new saved user', async() => {
    const password = 'test';
    const registerBody: RegisterBody = { name: usersData[0].name, email: usersData[0].email, password, repeatedPassword: password };

    repository.whenSearchThenReturn(null);

    const registeredUser = await registerUser(registerBody, repository);

    expect(registeredUser._id.value).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    expect(registeredUser.name.value).toBe(registerBody.name);
    expect(registeredUser.email.value).toBe(registerBody.email);
    expect(bcrypt.compareSync(registerBody.password, registeredUser.password.value)).toBeTruthy();
    expect(registeredUser.role.value).toBe('user');
    repository.assertLastSearchedByEmail(new UserEmail(registerBody.email));
    repository.assertLastSaved(registeredUser);
  });

  test('should throw an error if the given email already exist', async() => {
    const password = 'test';
    const registerBody: RegisterBody = { name: usersData[0].name, email: usersData[0].email, password, repeatedPassword: password };

    repository.whenSearchThenReturn(usersData[0]);

    try {
      const registeredUser = await registerUser(registerBody, repository);
      expect(registeredUser).toBeNull();
    } catch (error) {
      expect(error).toBeInstanceOf(UserAlreadyExists);
    }
    repository.assertLastSearchedByEmail(new UserEmail(registerBody.email));
  });

  test('should throw an error if the passwords are not equals', async() => {
    const password = 'test';
    const registerBody: RegisterBody = { name: usersData[0].name, email: usersData[0].email, password, repeatedPassword: 'test2' };

    repository.whenSearchThenReturn(null);

    try {
      const registeredUser = await registerUser(registerBody, repository);
      expect(registeredUser).toBeNull();
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidArgumentError);
    }
    repository.assertLastSearchedByEmail(new UserEmail(registerBody.email));
  });
});
