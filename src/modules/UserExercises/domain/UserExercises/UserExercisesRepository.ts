import { Nullable } from '../../../Shared/domain/Nullable';
import { UserExercisesPrimitive } from '../interfaces';
import { UserId } from '../../../Shared/domain/UserId';
import { UserExercises } from '.';

export interface UserExercisesRepository {

  save: (userExercise: UserExercises) => Promise<void>;

  searchAll: () => Promise<UserExercisesPrimitive[]>;

  search: (userId: UserId) => Promise<Nullable<UserExercisesPrimitive>>;

  delete: (userId: UserId) => Promise<Nullable<UserExercisesPrimitive>>;

  reset: () => Promise<void>;
}
