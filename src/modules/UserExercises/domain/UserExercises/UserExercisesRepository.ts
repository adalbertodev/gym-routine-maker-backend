import { Nullable } from '../../../Shared/domain/Nullable';
import { UserExercises } from '.';
import { UserExercisesPrimitive } from '../interfaces';
import { UserId } from '../../../Shared/domain/UserId';

export interface UserExercisesRepository {
  save: (userExercise: UserExercises) => Promise<void>;

  searchAll: () => Promise<UserExercisesPrimitive[]>;
  search: (userId: UserId) => Promise<Nullable<UserExercisesPrimitive>>;

  delete: (userId: UserId) => Promise<Nullable<UserExercisesPrimitive>>;

  reset: () => Promise<void>;
}
