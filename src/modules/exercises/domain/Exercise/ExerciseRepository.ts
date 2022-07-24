import { Nullable } from '../../../shared/domain/Nullable';
import { Exercise, ExerciseId } from './';
import { ExercisePrimitive } from '../interfaces';
import { UserId } from '../../../shared/domain/UserId';

export interface ExerciseRepository {
  searchAll: () => Promise<ExercisePrimitive[]>;
  searchByUser: (userId: UserId) => Promise<ExercisePrimitive[]>;
  search: (id: ExerciseId) => Promise<Nullable<ExercisePrimitive>>;

  save: (exercise: Exercise) => Promise<void>;

  reset: () => Promise<void>;
}
