import { ExerciseMuscle } from '../../../../../src/modules/UserExercises/domain/UserExercises';
import { EnumMother } from '../../../Shared/domain/EnumMother';
import { ExerciseMuscles } from '../../../../../src/modules/UserExercises/domain/interfaces/ExerciseMuscles';

export class ExerciseMuscleMother {
  public static create = (value: string): ExerciseMuscle => {
    return new ExerciseMuscle(value);
  };

  public static random = (): ExerciseMuscle => {
    return this.create(EnumMother.random(Object.values(ExerciseMuscles)));
  };
}
