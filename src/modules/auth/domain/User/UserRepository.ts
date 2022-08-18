import { Nullable } from '../../../Shared/domain/Nullable';
import { User, UserEmail } from '.';
import { UserId } from '../../../Shared/domain/UserId';
import { UserPrimitive } from '../interfaces';

export interface UserRepository {
  save: (user: User) => Promise<void>;

  searchAll: () => Promise<UserPrimitive[]>;
  search: (id: UserId) => Promise<Nullable<UserPrimitive>>;
  searchByEmail: (email: UserEmail) => Promise<Nullable<UserPrimitive>>;

  delete: (id: UserId) => Promise<Nullable<UserPrimitive>>;

  reset: () => Promise<void>;
}
