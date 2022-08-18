import { User, UserRepository } from '../../domain/User';
import { UserAlreadyExists } from '../../domain/Errors';
import { UserNotExist } from '../../domain/Errors/UserNotExist';

export const updateUser = async(user: User, repository: UserRepository): Promise<User> => {
  const userPrimitive = await repository.search(user._id);
  if (!userPrimitive) throw new UserNotExist(user._id.value);

  const userByEmail = await repository.searchByEmail(user.email);
  if (userByEmail && userByEmail._id !== userPrimitive._id) {
    throw new UserAlreadyExists(userPrimitive._id);
  }

  await repository.save(user);

  return user;
};
