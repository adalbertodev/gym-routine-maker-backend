import { ExerciseMuscle } from '../../../../../src/modules/exercises/domain/Exercise';
import { EnumMother } from '../../../shared/domain/EnumMother';
import { ExerciseMuscles } from '../../../../../src/modules/exercises/domain/interfaces/ExerciseMuscles';

export class ExerciseMuscleMother {
  public static create = (value: string): ExerciseMuscle => {
    return new ExerciseMuscle(value);
  };

  public static random = (): ExerciseMuscle => {
    return this.create(EnumMother.random(Object.values(ExerciseMuscles)));
  };
}
