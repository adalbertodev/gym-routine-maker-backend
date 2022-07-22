import { Nullable } from '../../shared/domain/Nullable';
import { User } from './User';
import { UserId } from '../../shared/domain/UserId';

export interface UserRepository {

  searchAll: () => Promise<User[]>;
  search: (id: UserId) => Promise<Nullable<User>>;

  save: (user: User) => Promise<void>;
}
