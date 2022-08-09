import {
  ExerciseBarWeightMother,
  ExerciseIdMother,
  ExerciseMuscleMother,
  ExerciseNameMother,
  ExerciseRmMother
} from '.';
import { Nullable } from '../../../../../src/modules/Shared/domain/Nullable';
import {
  Exercise,
  ExerciseBarWeight,
  ExerciseId,
  ExerciseMuscle,
  ExerciseName,
  ExerciseRm
} from '../../../../../src/modules/UserExercises/domain/UserExercises';

export class ExerciseMother {
  public static create = (
    _id: ExerciseId,
    name: ExerciseName,
    muscle: ExerciseMuscle,
    barWeight: Nullable<ExerciseBarWeight>,
    rm: Nullable<ExerciseRm>
  ) => {
    return new Exercise(_id, name, muscle, barWeight, rm);
  };

  public static random = (options?: { userId?: boolean; barWeight?: boolean; rm?: boolean }) => {
    return this.create(
      ExerciseIdMother.random(),
      ExerciseNameMother.random(),
      ExerciseMuscleMother.random(),
      options?.barWeight ? ExerciseBarWeightMother.random() : null,
      options?.rm ? ExerciseRmMother.random() : null
    );
  };
}
