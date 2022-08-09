import { UserIdMother } from '../../Shared/domain/UserIdMother';
import { UserEmailMother, UserMother, UserNameMother, UserPasswordMother, UserRoleMother } from '../domain/User';

export const randomUser = () => UserMother.random();

export const randomUserValues = () => randomUser().toPrimitives();

export const randomUserObjectValues = {
  _id: UserIdMother.random(),
  name: UserNameMother.random(),
  email: UserEmailMother.random(),
  password: UserPasswordMother.random(),
  role: UserRoleMother.random()
};

export const usersData = [
  randomUserValues(),
  randomUserValues(),
  randomUserValues(),
  randomUserValues(),
  randomUserValues(),
  randomUserValues()
];
