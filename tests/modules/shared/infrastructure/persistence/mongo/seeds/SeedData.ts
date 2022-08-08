import { User } from '../../../../../../../src/modules/Auth/domain/User';
import { usersSeedData } from '../../../../../../../src/modules/Auth/infrastructure/persistence/mongo/seeds/usersSeedData';
import { exercisesSeedData } from '../../../../../../../src/modules/UserExercises/infrastructure/persistence/mongo/seeds/exercisesSeedData';
import { Exercise } from '../../../../../../../src/modules/UserExercises/domain/UserExercises/Exercise';

export const seedGlobalData = {
  users: usersSeedData.map(userSeedData => User.fromPrimitives(userSeedData)),
  exercises: exercisesSeedData.map(exerciseSeedData => Exercise.fromPrimitives(exerciseSeedData))
};
