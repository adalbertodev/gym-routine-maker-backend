import { Nullable } from '../../shared/domain/Nullable';
import { User } from './User';
import { UserId } from '../../shared/domain/UserId';
import { UserEmail } from './UserEmail';
import { UserPrimitive } from './UserPrimitive';

export interface UserRepository {
  searchAll: () => Promise<UserPrimitive[]>;
  search: (id: UserId) => Promise<Nullable<UserPrimitive>>;
  searchByEmail: (email: UserEmail) => Promise<Nullable<UserPrimitive>>;

  save: (user: User) => Promise<void>;
}
