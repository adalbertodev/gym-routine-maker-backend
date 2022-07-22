import { User } from './User';
import { UserEmail } from './UserEmail';
import { Nullable } from '../../../shared/domain/Nullable';
import { UserId } from '../../../shared/domain/UserId';
import { UserPrimitive } from '../interfaces/UserPrimitive';

export interface UserRepository {
  searchAll: () => Promise<UserPrimitive[]>;
  search: (id: UserId) => Promise<Nullable<UserPrimitive>>;
  searchByEmail: (email: UserEmail) => Promise<Nullable<UserPrimitive>>;

  save: (user: User) => Promise<void>;
}
