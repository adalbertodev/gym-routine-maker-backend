import { ExerciseName } from '../../../../../src/modules/UserExercises/domain/UserExercises';
import { WordMother } from '../../../Shared/domain/WordMother';

export class ExerciseNameMother {
  public static create = (value: string): ExerciseName => {
    return new ExerciseName(value);
  };

  public static random = (): ExerciseName => {
    return this.create(WordMother.random());
  };
}
