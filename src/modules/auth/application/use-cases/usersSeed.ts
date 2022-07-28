import { User, UserRepository } from '../../domain/User';
import { usersSeedData } from '../utils';

export const userSeed = async(repository: UserRepository): Promise<User[]> => {
  const users = usersSeedData.map((userSeedData) => User.fromPrimitives(userSeedData));

  await repository.reset();

  for (const user of users) {
    await repository.save(user);
  }

  return users;
};
