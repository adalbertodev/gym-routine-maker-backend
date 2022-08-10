import { UserExercisesNotExist } from '../../domain/Errors/UserExercisesNotExist';
import { UserId } from '../../../Shared/domain/UserId';
import { UserExercisesRepository, UserExercises } from '../../domain/UserExercises';

export const getUserExercises = async(userId: UserId, repository: UserExercisesRepository): Promise<UserExercises> => {
  const userExercisePrimitive = await repository.search(userId);

  if (!userExercisePrimitive) {
    console.log('No existen ejercicios de ese id de usuario');
    throw new UserExercisesNotExist(userId.value);
  }

  return UserExercises.fromPrimitives(userExercisePrimitive);
};
