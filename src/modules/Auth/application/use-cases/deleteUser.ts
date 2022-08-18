import { User, UserRepository } from '../../domain/User';
import { UserId } from '../../../Shared/domain/UserId';
import { UserNotExist } from '../../domain/Errors/UserNotExist';

export const deleteUser = async(id: UserId, repository: UserRepository): Promise<User> => {
  const userPrimitive = await repository.delete(id);

  if (!userPrimitive) {
    throw new UserNotExist(id.value);
  }

  return User.fromPrimitives(userPrimitive);
};
