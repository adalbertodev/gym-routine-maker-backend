import { ExerciseBarWeight } from '../../../../../src/modules/UserExercises/domain/UserExercises';
import { IntegerMother } from '../../../shared/domain/IntegerMother';

export class ExerciseBarWeightMother {
  public static create = (value: number): ExerciseBarWeight => {
    return new ExerciseBarWeight(value);
  };

  public static random = (): ExerciseBarWeight => {
    return this.create(IntegerMother.random(2));
  };
}
