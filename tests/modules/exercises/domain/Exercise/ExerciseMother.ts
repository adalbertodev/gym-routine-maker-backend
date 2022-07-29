import {
  ExerciseBarWeightMother,
  ExerciseIdMother,
  ExerciseMuscleMother,
  ExerciseNameMother,
  ExerciseRmMother
} from '.';
import { Nullable } from '../../../../../src/modules/shared/domain/Nullable';
import { UserId } from '../../../../../src/modules/shared/domain/UserId';
import { UserIdMother } from '../../../shared/domain/UserIdMother';
import {
  Exercise,
  ExerciseBarWeight,
  ExerciseId,
  ExerciseMuscle,
  ExerciseName,
  ExerciseRm
} from '../../../../../src/modules/exercises/domain/Exercise';

export class ExerciseMother {
  public static create = (
    _id: ExerciseId,
    userId: Nullable<UserId>,
    name: ExerciseName,
    muscle: ExerciseMuscle,
    barWeight: Nullable<ExerciseBarWeight>,
    rm: Nullable<ExerciseRm>
  ) => {
    return new Exercise(_id, userId, name, muscle, barWeight, rm);
  };

  public static random = (options?: { userId?: boolean; barWeight?: boolean; rm?: boolean }) => {
    return this.create(
      ExerciseIdMother.random(),
      options?.userId ? UserIdMother.random() : null,
      ExerciseNameMother.random(),
      ExerciseMuscleMother.random(),
      options?.barWeight ? ExerciseBarWeightMother.random() : null,
      options?.rm ? ExerciseRmMother.random() : null
    );
  };
}
