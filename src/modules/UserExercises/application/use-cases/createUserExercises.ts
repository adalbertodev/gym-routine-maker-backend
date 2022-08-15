import { UserExercises, UserExercisesRepository } from '../../domain/UserExercises';
import { UserExercisesAlreadyExists } from '../../domain/Errors';
import { UserId } from '../../../Shared/domain/UserId';

export const createUserExercises = async(userId: UserId, repository: UserExercisesRepository): Promise<UserExercises> => {
  const userExercises = await repository.search(userId);
  if (userExercises) throw new UserExercisesAlreadyExists(userId.value);

  const newUserExercises = UserExercises.fromPrimitives({ _id: userId.value, exercises: [] });

  await repository.save(newUserExercises);
  return newUserExercises;
};
