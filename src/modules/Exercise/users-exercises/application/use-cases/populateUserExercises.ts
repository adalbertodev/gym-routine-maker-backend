import { UserExercisesRepository, UserExercises } from '../../domain/UserExercises';
import { PopulatedUserExercises } from '../../domain/UserExercises/PopulatedUserExercises';

export const populateUserExercises = async(userExercises: UserExercises, repository: UserExercisesRepository): Promise<PopulatedUserExercises> => {
  const populatedUserExercises = await repository.populate(userExercises);
  return PopulatedUserExercises.fromPrimitives(populatedUserExercises);
};
