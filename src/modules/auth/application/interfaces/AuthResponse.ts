import { ErrorResponse } from '../../../Shared/application/interfaces/ErrorResponse';
import { ResponseUser } from './UserResponse';

export type AuthResponse =
  | { user: ResponseUser | null; token: string }
  | { token: string }
  | { error: ErrorResponse };
