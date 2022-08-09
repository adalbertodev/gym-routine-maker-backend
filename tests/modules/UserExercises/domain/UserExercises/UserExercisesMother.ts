import { ExerciseMother } from '.';
import { UserId } from '../../../../../src/modules/Shared/domain/UserId';
import { UserExercises } from '../../../../../src/modules/UserExercises/domain/UserExercises/UserExercises';
import { Exercise } from '../../../../../src/modules/UserExercises/domain/UserExercises';
import { UserIdMother } from '../../../Shared/domain/UserIdMother';

export class UserExercisesMother {
  public static create = (_id: UserId, exercises: Exercise[]) => {
    return new UserExercises(_id, exercises);
  };

  public static random = (options?: { barWeight?: boolean; rm?: boolean }) => {
    return this.create(UserIdMother.random(), [ExerciseMother.random(), ExerciseMother.random()]);
  };
}
