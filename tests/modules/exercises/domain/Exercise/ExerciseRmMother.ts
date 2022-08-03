import { ExerciseRm } from '../../../../../src/modules/Exercise/exercises/domain/Exercise';
import { IntegerMother } from '../../../shared/domain/IntegerMother';

export class ExerciseRmMother {
  public static create = (value: number): ExerciseRm => {
    return new ExerciseRm(value);
  };

  public static random = (): ExerciseRm => {
    return this.create(IntegerMother.random(3));
  };
}
