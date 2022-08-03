import { usersSeedData } from '../../../../../../Auth/infrastructure/persistence/mongo/seeds/usersSeedData';
import { UserExercisesPrimitive } from '../../../../../exercises/domain/interfaces';
import { exercisesSeedData } from '../../../../../exercises/infrastructure/persistence/mongo/seeds/exercisesSeedData';

export const usersExercisesSeedData: UserExercisesPrimitive[] = [
  {
    _id: usersSeedData[0]._id,
    dryExercises: [
      {
        exercise: exercisesSeedData[0]._id,
        rm: null
      },
      {
        exercise: exercisesSeedData[1]._id,
        rm: null
      }
    ]
  },
  {
    _id: usersSeedData[1]._id,
    dryExercises: [
      {
        exercise: exercisesSeedData[2]._id,
        rm: null
      },
      {
        exercise: exercisesSeedData[3]._id,
        rm: null
      }
    ]
  }
];
