import { Nullable } from '../../shared/entities/Nullable';
import { User } from '../entities/User';
import { UserId } from '../../shared/entities/UserId';

export interface UserRepository {
  save: (user: User) => Promise<void>;

  search: (id: UserId) => Promise<Nullable<User>>;
}
