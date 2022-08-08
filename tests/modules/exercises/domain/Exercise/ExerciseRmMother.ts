import { ExerciseRm } from '../../../../../src/modules/UserExercises/domain/UserExercises';
import { IntegerMother } from '../../../shared/domain/IntegerMother';

export class ExerciseRmMother {
  public static create = (value: number): ExerciseRm => {
    return new ExerciseRm(value);
  };

  public static random = (): ExerciseRm => {
    return this.create(IntegerMother.random(3));
  };
}
