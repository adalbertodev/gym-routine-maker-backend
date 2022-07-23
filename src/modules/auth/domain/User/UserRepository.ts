import { Nullable } from '../../../shared/domain/Nullable';
import { User, UserEmail } from './';
import { UserId } from '../../../shared/domain/UserId';
import { UserPrimitive } from '../interfaces';

export interface UserRepository {
  searchAll: () => Promise<UserPrimitive[]>;
  search: (id: UserId) => Promise<Nullable<UserPrimitive>>;
  searchByEmail: (email: UserEmail) => Promise<Nullable<UserPrimitive>>;

  save: (user: User) => Promise<void>;

  reset: () => Promise<void>;
}
