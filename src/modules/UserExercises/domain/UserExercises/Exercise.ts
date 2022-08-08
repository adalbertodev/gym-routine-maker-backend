import { ExerciseBarWeight, ExerciseId, ExerciseMuscle, ExerciseName, ExerciseRm } from '.';
import { ExercisePrimitive } from '../interfaces';
import { Nullable } from '../../../Shared/domain/Nullable';

export class Exercise {
  readonly _id: ExerciseId;
  readonly name: ExerciseName;
  readonly muscle: ExerciseMuscle;
  readonly barWeight: Nullable<ExerciseBarWeight>;
  readonly rm: Nullable<ExerciseRm>;

  constructor(
    _id: ExerciseId,
    name: ExerciseName,
    muscle: ExerciseMuscle,
    barWeight: Nullable<ExerciseBarWeight>,
    rm: Nullable<ExerciseRm>
  ) {
    this._id = _id;
    this.name = name;
    this.muscle = muscle;
    this.barWeight = barWeight;
    this.rm = rm;
  }

  public static fromPrimitives = ({
    _id,
    name,
    muscle,
    barWeight,
    rm
  }: ExercisePrimitive) => {
    return new Exercise(
      new ExerciseId(_id),
      new ExerciseName(name),
      new ExerciseMuscle(muscle),
      barWeight ? new ExerciseBarWeight(barWeight) : null,
      rm ? new ExerciseRm(rm) : null
    );
  };

  public toPrimitives = (): ExercisePrimitive => {
    return {
      _id: this._id.value,
      name: this.name.value,
      muscle: this.muscle.value,
      barWeight: this.barWeight?.value || null,
      rm: this.rm?.value || null
    };
  };
}
