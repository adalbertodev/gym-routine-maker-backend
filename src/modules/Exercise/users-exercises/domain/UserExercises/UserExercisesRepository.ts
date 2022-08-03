import { Nullable } from '../../../../Shared/domain/Nullable';
import { UserExercises } from '.';
import { UserExercisesPrimitive } from '../../../exercises/domain/interfaces';
import { UserId } from '../../../../Shared/domain/UserId';
import { PopulatedUserExercisesPrimitive } from '../interfaces/PopulatedUserExercisesPrimitive';

export interface UserExercisesRepository {

  save: (userExercise: UserExercises) => Promise<void>;

  searchAll: () => Promise<UserExercisesPrimitive[]>;

  search: (userId: UserId) => Promise<Nullable<UserExercisesPrimitive>>;

  delete: (userId: UserId) => Promise<Nullable<UserExercisesPrimitive>>;

  populate: (userExercise: UserExercises) => Promise<PopulatedUserExercisesPrimitive>;

  reset: () => Promise<void>;
}
