import dotenv from 'dotenv';

import { User } from '../../../../domain/User';
import { UserConnectionManager } from '../../UserConnectionManager';
import { usersSeedData } from './usersSeedData';

export const usersSeed = async(): Promise<void> => {
  dotenv.config({ path: '.env.dev' });
  const repository = UserConnectionManager.connect();

  const users = usersSeedData.map((userSeedData) =>
    User.fromPrimitives(userSeedData)
  );

  await repository.reset();

  for (const user of users) {
    await repository.save(user);
  }

  UserConnectionManager.disconnect();
};

usersSeed();
