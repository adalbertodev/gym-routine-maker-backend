import { User } from '../../../../../src/modules/Auth/domain/User';
import { randomUser, randomUserObjectValues, randomUserValues } from '../../__fixtures__/UsersFixtures';

describe('User', () => {
  describe('#constructor', () => {
    test('should return a new user instance', () => {
      const { _id, name, email, password, role } = randomUserObjectValues;
      const user = new User(_id, name, email, password, role);

      expect(user).toBeInstanceOf(User);
      expect(user._id.value).toBe(_id.value);
      expect(user.name.value).toBe(name.value);
      expect(user.email.value).toBe(email.value);
      expect(user.password.value).toBe(password.value);
      expect(user.role.value).toBe(role.value);
    });
  });

  describe('#fromPrimtives', () => {
    test('should return a new user instance form primitives', () => {
      const { _id, name, email, password, role } = randomUserValues;
      const user = User.fromPrimitives({ _id, name, email, password, role });

      expect(user).toBeInstanceOf(User);
      expect(user._id.value).toBe(_id);
      expect(user.name.value).toBe(name);
      expect(user.email.value).toBe(email);
      expect(user.password.value).toBe(password);
      expect(user.role.value).toBe(role);
    });
  });

  describe('#toPrimitives', () => {
    test('should return a primitive object from user instance', () => {
      const user = randomUser();
      const userPrimitive = user.toPrimitives();

      expect(userPrimitive._id).toBe(user._id.value);
      expect(userPrimitive.name).toBe(user.name.value);
      expect(userPrimitive.email).toBe(user.email.value);
      expect(userPrimitive.password).toBe(user.password.value);
      expect(userPrimitive.role).toBe(user.role.value);
    });
  });
});
