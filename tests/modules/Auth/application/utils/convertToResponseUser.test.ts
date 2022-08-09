import { convertToResponseUser } from '../../../../../src/modules/Auth/application/utils/convertToResponseUser';
import { randomUser } from '../../__fixtures__/UsersFixtures';

describe('convertToResponseUser', () => {
  test('should return a response user with the given user', () => {
    const user = randomUser();
    const responseUser = convertToResponseUser(user);

    expect(responseUser.id).toBe(user._id.value);
    expect(responseUser.name).toBe(user.name.value);
    expect(responseUser.email).toBe(user.email.value);
    expect(responseUser.role).toBe(user.role.value);
  });
});
