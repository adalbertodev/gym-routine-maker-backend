import { User, UserRepository } from '../../domain/User';

export const getAllUsers = async(repository: UserRepository): Promise<User[]> => {
  const usersPrimitive = await repository.searchAll();
  return usersPrimitive.map((userPrimitive) => User.fromPrimitives(userPrimitive));
};
