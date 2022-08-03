import { AggregateRoot } from '../../../../Shared/domain/AggregateRoot';
import { ExerciseBarWeight, ExerciseId, ExerciseMuscle, ExerciseName } from '.';
import { ExercisePrimitive } from '../interfaces';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { UserId } from '../../../../Shared/domain/UserId';

export class Exercise extends AggregateRoot {
  readonly _id: ExerciseId;
  readonly userId: Nullable<UserId>;
  readonly name: ExerciseName;
  readonly muscle: ExerciseMuscle;
  readonly barWeight: Nullable<ExerciseBarWeight>;

  constructor(
    _id: ExerciseId,
    userId: Nullable<UserId>,
    name: ExerciseName,
    muscle: ExerciseMuscle,
    barWeight: Nullable<ExerciseBarWeight>
  ) {
    super();
    this._id = _id;
    this.userId = userId;
    this.name = name;
    this.muscle = muscle;
    this.barWeight = barWeight;
  }

  public static fromPrimitives = ({
    _id,
    userId,
    name,
    muscle,
    barWeight
  }: ExercisePrimitive) => {
    return new Exercise(
      new ExerciseId(_id),
      userId ? new UserId(userId) : null,
      new ExerciseName(name),
      new ExerciseMuscle(muscle),
      barWeight ? new ExerciseBarWeight(barWeight) : null
    );
  };

  public toPrimitives = (): ExercisePrimitive => {
    return {
      _id: this._id.value,
      userId: this.userId?.value || null,
      name: this.name.value,
      muscle: this.muscle.value,
      barWeight: this.barWeight?.value || null
    };
  };
}
