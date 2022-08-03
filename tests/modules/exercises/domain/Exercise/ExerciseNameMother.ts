import { ExerciseName } from '../../../../../src/modules/Exercise/exercises/domain/Exercise';
import { WordMother } from '../../../shared/domain/WordMother';

export class ExerciseNameMother {
  public static create = (value: string): ExerciseName => {
    return new ExerciseName(value);
  };

  public static random = (): ExerciseName => {
    return this.create(WordMother.random());
  };
}
