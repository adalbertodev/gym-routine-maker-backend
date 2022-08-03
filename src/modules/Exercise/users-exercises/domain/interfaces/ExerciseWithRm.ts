import { Nullable } from '../../../../Shared/domain/Nullable';
import { Exercise, ExerciseId } from '../../../exercises/domain/Exercise';
import { UserExercisesRm } from '../UserExercises';

export interface DryExerciseWithRm {
  exercise: ExerciseId
  rm: Nullable<UserExercisesRm>
}

export interface ExerciseWithRm {
  exercise: Exercise
  rm: Nullable<UserExercisesRm>
}
