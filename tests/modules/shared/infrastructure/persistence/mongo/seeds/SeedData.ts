import { User } from '../../../../../../../src/modules/auth/domain/User';
import { usersSeedData } from '../../../../../../../src/modules/auth/infrastructure/persistence/mongo/seeds/usersSeedData';
import { exercisesSeedData } from '../../../../../../../src/modules/exercises/infrastructure/persistence/mongo/seeds/exercisesSeedData';
import { Exercise } from '../../../../../../../src/modules/exercises/domain/Exercise/Exercise';

export const seedGlobalData = {
  users: usersSeedData.map(userSeedData => User.fromPrimitives(userSeedData)),
  exercises: exercisesSeedData.map(exerciseSeedData => Exercise.fromPrimitives(exerciseSeedData))
};
