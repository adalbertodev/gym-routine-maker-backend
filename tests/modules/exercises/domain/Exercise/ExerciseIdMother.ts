import { ExerciseId } from '../../../../../src/modules/UserExercises/domain/UserExercises';
import { UuidMother } from '../../../shared/domain/UuidMother';

export class ExerciseIdMother {
  public static create = (value: string): ExerciseId => {
    return new ExerciseId(value);
  };

  public static random = (): ExerciseId => {
    return this.create(UuidMother.random());
  };
}
