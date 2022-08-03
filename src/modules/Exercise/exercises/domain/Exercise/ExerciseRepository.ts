import { Nullable } from '../../../../Shared/domain/Nullable';
import { Exercise, ExerciseId, ExerciseName } from '.';
import { ExercisePrimitive } from '../interfaces';
import { UserId } from '../../../../Shared/domain/UserId';

export interface ExerciseRepository {
  save: (exercise: Exercise) => Promise<void>;

  searchAll: () => Promise<ExercisePrimitive[]>;
  searchByUser: (userId: UserId) => Promise<ExercisePrimitive[]>;

  search: (id: ExerciseId) => Promise<Nullable<ExercisePrimitive>>;
  searchByName: (name: ExerciseName) => Promise<Nullable<ExercisePrimitive>>;

  delete: (id: ExerciseId) => Promise<Nullable<ExercisePrimitive>>;

  reset: () => Promise<void>;
}
