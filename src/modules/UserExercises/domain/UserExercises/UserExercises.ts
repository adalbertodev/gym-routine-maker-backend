import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { Exercise } from '.';
import { UserExercisesPrimitive } from '../interfaces/UserExercisesPrimitive';
import { UserId } from '../../../Shared/domain/UserId';

export class UserExercises extends AggregateRoot {
  readonly _id: UserId;
  readonly exercises: Exercise[];

  constructor(userId: UserId, exercises: Exercise[]) {
    super();
    this._id = userId;
    this.exercises = exercises;
  }

  public static fromPrimitives = ({ _id, exercises }: UserExercisesPrimitive) => {
    return new UserExercises(
      new UserId(_id),
      exercises.map(exercise => Exercise.fromPrimitives(exercise))
    );
  };

  public toPrimitives = (): UserExercisesPrimitive => {
    return {
      _id: this._id.value,
      exercises: this.exercises.map(exercise => exercise.toPrimitives())
    };
  };
}
