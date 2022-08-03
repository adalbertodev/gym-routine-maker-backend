import { AggregateRoot } from '../../../../Shared/domain/AggregateRoot';
import { ExerciseId } from '../../../exercises/domain/Exercise';
import { UserExercisesPrimitive } from '../interfaces/UserExercisesPrimitive';
import { UserId } from '../../../../Shared/domain/UserId';
import { DryExerciseWithRm } from '../interfaces/ExerciseWithRm';
import { UserExercisesRm } from './UserExercisesRm';

export class UserExercises extends AggregateRoot {
  readonly _id: UserId;
  readonly dryExercises: DryExerciseWithRm[];

  constructor(userId: UserId, dryExercises: DryExerciseWithRm[]) {
    super();
    this._id = userId;
    this.dryExercises = dryExercises;
  }

  public static fromPrimitives = ({ _id, dryExercises }: UserExercisesPrimitive) => {
    return new UserExercises(
      new UserId(_id),
      dryExercises.map(dryExercise => ({
        exercise: new ExerciseId(dryExercise.exercise),
        rm: dryExercise.rm ? new UserExercisesRm(dryExercise.rm) : null
      }))
    );
  };

  public toPrimitives = (): UserExercisesPrimitive => {
    return {
      _id: this._id.value,
      dryExercises: this.dryExercises.map(dryExercise => ({
        exercise: dryExercise.exercise.value,
        rm: dryExercise.rm ? dryExercise.rm.value : null
      }))
    };
  };
}
