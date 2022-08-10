import { Exercise } from '../../../../../src/modules/UserExercises/domain/UserExercises';
import { ExerciseMother } from '.';
import { UserExercises } from '../../../../../src/modules/UserExercises/domain/UserExercises/UserExercises';
import { UserId } from '../../../../../src/modules/Shared/domain/UserId';
import { UserIdMother } from '../../../Shared/domain/UserIdMother';

export class UserExercisesMother {
  public static create = (_id: UserId, exercises: Exercise[]) => {
    return new UserExercises(_id, exercises);
  };

  public static random = () => {
    return this.create(UserIdMother.random(), [ExerciseMother.random(), ExerciseMother.random()]);
  };
}
