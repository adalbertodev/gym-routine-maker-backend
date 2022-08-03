import { ExerciseId } from '../../../../../src/modules/Exercise/exercises/domain/Exercise';
import { UuidMother } from '../../../shared/domain/UuidMother';

export class ExerciseIdMother {
  public static create = (value: string): ExerciseId => {
    return new ExerciseId(value);
  };

  public static random = (): ExerciseId => {
    return this.create(UuidMother.random());
  };
}
