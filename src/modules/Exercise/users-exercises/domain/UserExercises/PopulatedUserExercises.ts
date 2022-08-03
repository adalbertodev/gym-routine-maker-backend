import { AggregateRoot } from '../../../../Shared/domain/AggregateRoot';
import { Exercise } from '../../../exercises/domain/Exercise';
import { UserId } from '../../../../Shared/domain/UserId';
import { UserExercisesRm } from './UserExercisesRm';
import { ExerciseWithRm } from '../interfaces/ExerciseWithRm';
import { PopulatedUserExercisesPrimitive } from '../interfaces/PopulatedUserExercisesPrimitive';

export class PopulatedUserExercises extends AggregateRoot {
  readonly _id: UserId;
  readonly exercises: ExerciseWithRm[];

  constructor(
    userId: UserId,
    exercises: ExerciseWithRm[]
  ) {
    super();
    this._id = userId;
    this.exercises = exercises;
  }

  public static fromPrimitives = ({
    _id,
    exercises
  }: PopulatedUserExercisesPrimitive) => {
    return new PopulatedUserExercises(
      new UserId(_id),
      exercises.map(exercise => ({
        exercise: Exercise.fromPrimitives(exercise.exercise),
        rm: exercise.rm ? new UserExercisesRm(exercise.rm) : null
      }))
    );
  };

  public toPrimitives = (): PopulatedUserExercisesPrimitive => {
    return {
      _id: this._id.value,
      exercises: this.exercises.map(exercise => ({
        exercise: exercise.exercise.toPrimitives(),
        rm: exercise.rm ? exercise.rm.value : null
      }))
    };
  };
}
