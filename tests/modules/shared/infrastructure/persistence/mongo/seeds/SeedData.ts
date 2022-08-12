import { User } from '../../../../../../../src/modules/Auth/domain/User';
import { UserExercises } from '../../../../../../../src/modules/UserExercises/domain/UserExercises';
import { usersExercisesData } from '../../../../../UserExercises/__fixtures__/UsersExercisesFixtures';
import { usersSeedData } from '../../../../../../../src/modules/Auth/infrastructure/persistence/mongo/seeds/usersSeedData';

export const seedGlobalData = {
  users: usersSeedData.map(userSeedData => User.fromPrimitives(userSeedData)),
  usersExercises: usersExercisesData.map(userExercisesSeedData => UserExercises.fromPrimitives(userExercisesSeedData))
};
